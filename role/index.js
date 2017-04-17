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
    console.log('role::',v,d)
    exports[v.split('.')[0]] = roles[v.split('.')[0]] = d
})

exports.middle = async (ctx, next) => {
    try {
        let session = ctx.sessionData
        session.role =  session.role || 'designer'
        console.log('check role',session.role,roles)
        let rl = roles[session.role]
        let s = await rl.check(ctx)
        console.log('role check result:',s)
        return  s
    } catch (err) {
        console.log(err)
        ctx.body = { message: err.message };
        ctx.status = err.status || 500;
    }
}
