// socket.io
var io = require('socket.io')();

let init_socket = () => {
  var port = 3031;
  io.listen(port);
  console.log('listening on port ', port);
}

exports.io = io;
exports.init_socket = init_socket;


