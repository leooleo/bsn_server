var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/status.html');
});

io.on('connection', function(socket){
	var sleep = require('sleep');
	console.log('a user connected');
	socket.emit('chat', '15%');
	// sleep.sleep(4);
	// socket.emit('chat', '39%');
	// for (let i = 0; i < 10; i++) {
	// 	var num = Math.round(Math.random() * (100 - 0) + 0);
	// 	console.log(num.toString() + '%');
	// 	socket.emit('chat',num.toString() + '%');  
	// 	sleep.sleep(4);
	// }
  
  
	
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});


