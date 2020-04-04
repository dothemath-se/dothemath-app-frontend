var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});