const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io');

server.listen(8070);

const ws = io.listen(server);

ws.on('connection', (socket) => {
  console.log('new conn' + socket.id);
  socket.on('pingServer', (val) => {
    console.log('received ' + val);
    socket.emit('messageChannel', 'Do you listen?')
  })
})

