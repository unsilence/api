"use strict"
const getRawBody = require('./raw')
const colors = require('colors');
colors.setTheme({silly: 'rainbow',input: 'grey',verbose: 'cyan',prompt: 'red',
              info: 'green',data: 'blue',help: 'cyan',warn: 'yellow',debug: 'magenta',error: 'red'});

//加载配置文件
const config = require('../im_config.json')

//初始化数据库模块和连接数据库
const model =  require('./model')
model.connect(config.dbstr)


const app = new (require('koa'))();

//接收上传的文件存储到gridfs 返回对应md5 ,和 根据md5 获得对应的文件 图片统一按png格式处理
app.use(require('./file').middle)
//加载『导出数据』的机制
app.use(require('./export').middle)

const isJSON = str=>{
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

//接受和返回只接受json格式 请求参数统一放到post里
app.use(async (ctx, next) => {
    try {
        const buf = await getRawBody(ctx.req)
        ctx.rawBody = buf.toString() || '{}'
        console.info(`${new Date()} ${ctx.path} >>>>>>>>>>>>>>>>>>>>>>>> `.debug)
        console.info(`post:,${ctx.rawBody}`.debug)
        if(!isJSON(ctx.rawBody)){
          ctx.status =  500;
          ctx.body = { message: '请求格式有误：仅限JSON格式' };
          console.info(`请求格式有误：仅限JSON格式`.error)
        }else{
          await next()
          console.info(`${new Date()} ${ctx.path} <<<<<<<<<<<<<<<<<<<<<<<< `.info)
          console.info(`response:,${JSON.stringify(ctx.body).slice(0,100)}`.info)
        }

    } catch (err) {
        console.log(`${err}`.error)
        ctx.status = err.status || 500;
        ctx.body = { message: err.message };
    }
})

//用户注册登录相关
app.use(require('./auth').middle)

//权限和数据过滤 分角色(带有参数 )
app.use(require('./role').middle)



//加载【消息框架】
// const UserMessage = require('./msg/lib/user')
// if(clt == 'User'){
//   UserMessage.msg(ret.cnum)
// }
const message = require('./msg')
app.use(message.middle)

//加载 【业务日志框架】


app.use(async (ctx,next) => {
    let urls = ctx.path.split('/')
    let clt = urls[1] || 'null'
    let method = urls[2] || 'null'
    let {id,filter,limit,startPos,orderBy,item,cnum} = JSON.parse(ctx.rawBody)
    console.log(clt,method,{id,filter,limit,startPos,orderBy})
    let retItem,retList;
    if(!(clt in model)){
      ctx.status =  500;
      ctx.body = { message: '所请求的数据集合不存在' };
      console.info(`所请求的数据不存在`.error)
    }else{
      let table = model[clt]
      switch (method) {
        case 'getById':
          filter = {_id:id}
          if('auth_filter' in ctx){
            filter = Object.assign(filter,ctx.auth_filter)
          }
          retItem = await table.getById(filter)
          ctx.body = {status:'success',data:{item:retItem}}
          break;
        case 'getByNum':
          filter = {cnum}
          if('auth_filter' in ctx){
            filter = Object.assign(filter,ctx.auth_filter)
          }
          retItem = await table.getByNum(filter)

          ctx.body = {status:'success',data:{item:retItem}}
          break;
        case 'deleteById':
          filter = {_id:id}
          if('auth_filter' in ctx){
            filter = Object.assign(filter,ctx.auth_filter)
          }
          item = {lastModifyByUser:ctx.sessionData.user.cnum}
          retItem = await table.deleteById(filter,item)
          ctx.body = {status:'success',data:{item:retItem}}
          break;
        case 'deleteByNum':
          filter = {cnum}
          if('auth_filter' in ctx){
            filter = Object.assign(filter,ctx.auth_filter)
          }
          item = {lastModifyByUser:ctx.sessionData.user.cnum}
          retItem = await table.deleteByNum(filter,item)
          ctx.body = {status:'success',data:{item:retItem}}
          break;
        case 'updateById':
          filter = {_id:id}
          if('auth_filter' in ctx){
            filter = Object.assign(filter,ctx.auth_filter)
          }
          item.lastModifyByUser = ctx.sessionData.user.cnum
          retItem = await table.updateById(filter,item)
          ctx.body = {status:'success',data:{item:retItem}}
          break;
        case 'updateByNum':
          filter = {cnum}
          if('auth_filter' in ctx){
            filter = Object.assign(filter,ctx.auth_filter)
          }
          item.lastModifyByUser = ctx.sessionData.user.cnum
          retItem = await table.updateByNum(filter,item)
          ctx.body = {status:'success',data:{item:retItem}}
          break;
        case 'fetch':
          if('auth_filter' in ctx){
            filter = Object.assign(filter||{},ctx.auth_filter)
          }
          retList = await table.fetch(filter,orderBy,limit,startPos)
          ctx.body = {status:'success',data:retList}
          break;
        case 'addItem':
          item.ownByUser = ctx.sessionData.user.cnum
          item.lastModifyByUser = ctx.sessionData.user.cnum
          retItem = await table.addItem(item)
          ctx.body = {status:'success',data:{item:retItem}}
          break;
        default:
          ctx.status =  500;
          ctx.body = { message: '所请求的接口不存在' };
          console.info(`所请求的数据不存在`.error)
      }
      cleanItem(retItem)
      if(retList){retList.list.map(d=>cleanItem(d))}

    }

});

const cleanItem = (item)=>{
  if(item){
    delete item.qtext
    delete item.valid
    delete item.lastModifyByUser
    delete item.ownByUser
  }
}


const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
message.bind(io)

console.log('port:',config.port)
server.listen(config.port);
