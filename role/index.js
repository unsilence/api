"use strict"
const fs = require('fs')
const path = require('path')

function walk(p) {
    var dirList = fs.readdirSync(p);
    dirList.forEach(function(item) {
        var _p = path.join(p, item)
        if (fs.statSync(_p).isDirectory()) {
            walk(_p);
        } else {
            fileList.push(_p);
        }
    });
}
let fileList = []
walk(path.join(__dirname, 'lib'))
let roles = {}
let namelist = fileList.map(v=>path.basename(v))
    .filter(v=>!v.startsWith('_')).map(v=>{
    var d = require('./lib/'+v)
    let roleName = v.split('.')[0]
    console.log("role::",roleName)
    exports[roleName] = roles[v.split('.')[0]] = d
})

exports.middle = async (ctx, next) => {
    try {
        let session = ctx.sessionData
        console.log('check role',session.user.role)
        let rl = roles[session.user.role||'designer']
        //1 检查是否可以
        //2 数据是否需要过滤
        let urls = ctx.path.split('/')
        let colName = urls[1] || 'test---'
        let action = urls[2] || '---'
        let [can,auth_filter] =  await rl.check(colName,action,ctx.sessionData.user)
        console.log('role check:',{can,auth_filter})
        if(!can){
          ctx.body = { status:'wrong',msg:"数据不存在或者权限不够" };
          ctx.status = 500;
        }else{
          ctx.auth_filter = auth_filter
          await next()
        }
    } catch (err) {
        console.log(err)
        ctx.body = { message: err.message };
        ctx.status = err.status || 500;
    }
}
