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
let ACTIONS = {}
let namelist = fileList.map(v=>path.basename(v))
    .filter(v=>!v.startsWith('_')).map(v=>{
    var d = require('./lib/'+v)
    console.log('role::',v,d)
    exports[v.split('.')[0]] = ACTIONS[v.split('.')[0]] = d.middle
})

exports.middle = async (ctx, next) => {
  let urls = ctx.path.split('/')
  let clt = urls[1] || 'file'
  let action = urls[2] || ''
  if(clt === 'export'){
    if(action in ACTIONS){
         await ACTIONS[action](ctx,next)
    }else {
      throw new Error('访问地址不存在')
    }
  } else {
    await next()
  }

}
