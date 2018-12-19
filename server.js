var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use("/files", express.static(__dirname + "/files"));

app.get('/', function(req, res){
//   res.sendFile(__dirname + '/status.html');
	res.sendFile(__dirname + '/chart.html');
});

function get_correspondant_color(packet) {
	var splited_packet = packet.split('/');
	var patient_status = splited_packet[splited_packet.length-1];
	switch (true) {
		case patient_status <= 10:			
			// Blue
			return '#3498db';
		case patient_status <= 30:
			// Green
			return '#00d824';
		case patient_status <= 60:
			// Yellow
			return '#fff23d';
		case patient_status <= 80:
			// Orange
			return '#f7891b';
		case patient_status <= 100:
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
		data = data.toString();
		
		// Remove \n caso exista
		data = data.replace('\n', '');
		// console.log("Received from bsn " + data);
		
		// Char separador
		data = data.split('*')[0];
		
		// Broadcast to all clients		
		var packet = data;
		var color  = get_correspondant_color(packet);
		packet += '-' + color;
		
		io.emit('chat', packet  ,{ for: 'everyone' });
    });
});

server.listen(6060, function() { 
	console.log('server is listening');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


