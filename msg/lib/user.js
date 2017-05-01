const _msg = require('../index')

exports.msg = (cnum)=>{
  //io.sockets.socket(socketid).emit(‘String’, data);
  _msg.IO.emit('user', cnum);
}
