var sleep = require('sleep');
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io');

const port = 8081

server.listen(port);

const ws = io.listen(server);
console.log('Server listening on port ' + port);

function getRandObj() {
  return {
    'battery': Math.floor(Math.random() * Math.floor(100)),
    'risk': Math.floor(Math.random() * Math.floor(100)),
    'raw': Math.floor(Math.random() * Math.floor(100))
  }
}

async function emitAllChannels(socket, object) {
  socket.emit('thermometerChannel', object);
  socket.emit('ecgChannel', object);
  socket.emit('oximeterChannel', object);
  socket.emit('bpmsChannel', object);
  socket.emit('bpmdChannel', object);
}

ws.on('connection', function (socket) {
  console.log('new conn' + socket.id);
  
  // socket.on('pingServer', (val) => {
  //   console.log('received ' + val);    
  //   var obj = getRandObj();    
  //   console.log(obj);
  //   // ws.emit('thermometerChannel',JSON.stringify(obj))
  //     emitAllChannels(ws, JSON.stringify(obj));   
  //   // socket.broadcast('thermometChannel',JSON.stringify(obj))
  //   // ws.emit('thermometChannel',JSON.stringify(obj))
  //   // emitAllChannels(socket, JSON.stringify(thermometerObject2));
  // })
})

const readline = require('readline');

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}
async function init() {
  const ans = await askQuestion("Are you sure you want to deploy to PRODUCTION? ");
  var obj = getRandObj();
  emitAllChannels(ws, JSON.stringify(obj));   
  console.log('emited!');
  init()
}

init()
