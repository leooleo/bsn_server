var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var getJSON = require('get-json');


app.use("/files", express.static(__dirname + "/files"));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/home.html');
	// res.sendFile(__dirname + '/chart.html');
});

// Pull available configurations from bsn
app.get('/config', function(req, res){
	getJSON('http://127.0.0.1:5000/config')
    .then(function(json_data) {		
		res.json(json_data)
    }).catch(function(error) {
		console.log(error);
    });
});

// Give a color based on patient status
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
		
		// Remove \n if there are any
		data = data.replace('\n', '');
		// console.log("Received from bsn " + data);
		
		// Separate package
		data = data.split('*')[0];
		
		var packet = data;
		var color  = get_correspondant_color(packet);
		packet += '-' + color;
		
		// Broadcast to all clients the packet
		io.emit('chat', packet , { for: 'everyone' });
    });
});

server.listen(6060, function() { 
	console.log('server is listening');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});