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
// let namelist = fileList.map(v=>path.basename(v))
//     .filter(v=>!v.startsWith('_')).map(v=>{
//     var d = require('./lib/'+v)
//     console.log('role::',v,d)
//     exports[v.split('.')[0]] = ACTIONS[v.split('.')[0]] = d.middle
// })
let IO
let tokens = exports.tokens = {}

exports.bind = (io)=>{
  IO = exports.IO = io
  io.on('connection',(socket)=>{
      console.log('connection',socket.id)
      socket.on('login',token=>{
        console.log('message::login',token,socket.id)
        tokens[token]=socket
      })
      socket.on('modify', function(msg){
        console.log('message:',msg)
        //io.sockets.socket(socketid).emit(‘String’, data);
        io.emit('user', msg);
      });
  })
}
