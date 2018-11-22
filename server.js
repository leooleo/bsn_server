var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/status.html');
});

function get_correspondant_color(data) {	
	switch (true) {
		case data <= 10:			
			// Blue
			return '#3498db';
		case data <= 30:
			// Green
			return '#56ff61';
		case data <= 60:
			// Yellow
			return '#f7ff60';
		case data <= 80:
			// Orange
			return '#f7891b';
		case data <= 100:
			return 'red';
		default:
			return 'gray';			
	}	
}

var net = require('net');
var server = net.createServer(function(connection) { 
    console.log('bsn connected');

    connection.on('end', function() {
        console.log('bsn disconnected');
    });

    connection.on('data', function(data) {		
		console.log("Received from bsn " + data.toString());
		// Broadcast to all clients
		var packet = data.toString() + '%' + '-' + get_correspondant_color(Number(data));
		io.emit('chat', packet  ,{ for: 'everyone' });
    });
});

server.listen(8080, function() { 
	console.log('server is listening');
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});


