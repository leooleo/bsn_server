const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io');
const port = 8081

server.listen(port);

const ws = io.listen(server);
console.log('Server listening on port ' + port);

ws.on('connection', (socket) => {
  console.log('new conn' + socket.id);
  socket.on('pingServer', (val) => {
    console.log('received ' + val);
    socket.emit('messageChannel', 'Do you listen?')
  })
})

