var model = require( './model')
var SMS = require('aliyun-sms-node');
var config = require('../im_config.json')
var sms = new SMS({
  AccessKeyId: config.sms.AccessKeyId,
  AccessKeySecret: config.sms.AccessKeySecret
});
const ACTIONS ={
    //获得一个会话的token
    //发送验证码
    //登录 or 注册
    //获得该会话人的身份信息 5697083e9ef262abaf7aa7fa58c3e21d
    async get_token(ctx,next){
        let item = await model.Session.addItem({data:'{}'})
        ctx.body = {status:'success',token:item._id}
    },
    async get_code(ctx,next){
        let item = await model.Session.getById({_id:ctx.query.token})
        if(item){
            let code = (parseInt(Math.random()*10000)+'0000').slice(0,4)
            let codeCreateAt = Date.now()
            let {phone} = JSON.parse(ctx.rawBody);

            sms.send({
              Action:config.sms.Action,
              Format:config.sms.Format,
              ParamString:'{"name":"'+code+'"}',
              RecNum:phone,
              SignName:config.sms.SignName,
              TemplateCode:config.sms.TemplateCode,
            })

            let sessionData = Object.assign({},JSON.parse(item.data),{phone,code,codeCreateAt})
            await model.Session.updateById({_id:item._id},{data:JSON.stringify(sessionData)})
            ctx.body = {status:'success',msg:'验证码已经发送'}
        }else{
            ctx.body = {status:'wrong',msg:'验证码发送失败'}
        }
    },
    async login(ctx,next){
        console.log("query",ctx.query)
        let item = await model.Session.getById({_id:ctx.query.token})
        if(!item)
            return ctx.body = {status:'wrong',msg:'请先用/auth/get_token 获得一个token'}
        let {phone,code,password} = JSON.parse(ctx.rawBody);
        let sessionData = Object.assign({},JSON.parse(item.data))
        if(phone != sessionData.phone || code != sessionData.code)
            return ctx.body = {status:'wrong',msg:'验证码错误'}
        let us = await model.User.fetch({phone});
        let u;
        if(us.count > 0){
            u = us.list[0]
        }else{
            u = await model.User.addItem({phone})
        }
        sessionData.user=u
        sessionData.user.role = sessionData.user.role  || 'designer'
        await model.Session.updateById({_id:item._id},{data:JSON.stringify(sessionData)})
        ctx.body = {status:'success',data:{item:u,token:item._id}}
    },
    async account(ctx,next){
        console.log("query",ctx.query)
        let item = await model.Session.getById({_id:ctx.query.token})
        if(item){
            let sessionData = Object.assign({},JSON.parse(item.data))
            sessionData.user.role = sessionData.user.role  ||'designer'
            ctx.body = {status:'success',data:{item:sessionData.user}}
        }else{
            ctx.body = {status:'wrong',msg:'请使用/auth/login接口登录'}
        }
    },
    async logout(ctx,next){
        let item = await model.Session.deleteById(ctx.query.token)
        ctx.body = {status:'success',msg:'退出成功'}
    },
    async roles(ctx,next){
      let roles  = []
      Object.keys(role).map(k=>{
        roles.push({name:k,auth:role[k].tables})
      })
      ctx.body = {status:'success',data:{list:roles}}
    }
}


exports.middle = async (ctx, next) => {
    try {
        let urls = ctx.path.split('/')
        let clt = urls[1] || 'file'
        let action = urls[2] || ''
        if(clt === 'auth'){
            if(action in ACTIONS){
               await ACTIONS[action](ctx,next)
          }else {
            throw new Error('访问地址不存在')
          }
        }else if (true) {//这里要检测 1 是否已登录  2 是否为总部
            let item = await model.Session.getById({_id:ctx.query.token})
            if(item){
                let sessionData = Object.assign({},JSON.parse(item.data))
                ctx.sessionData = sessionData
                await next()

            }else{
                ctx.body = {status:'wrong',msg:'请使用/auth/login接口登录'}
            }

        }
    } catch (err) {
        console.log(err)
        ctx.body = { message: err.message };
        ctx.status = err.status || 500;
    }
}
