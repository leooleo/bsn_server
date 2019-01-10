var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var getJSON = require('get-json');
var net = require('net');
var request = require('request');


app.use("/files", express.static(__dirname + "/files"));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/files/html/home.html');
});

app.get('/monitor', function(req, res) {
	res.sendFile(__dirname + '/files/html/chart.html');
});
app.get('/custom', function(req, res) {
	res.sendFile(__dirname + '/files/html/customize.html');
});

app.get('/name', function(req, res) {
	for(i in req.query) {
		console.log(i);
		console.log(req.query[i]);
	}
	console.log((req.query));	
	res.send('You sent the name "' + req.query.markov + '".');
});

// Pull available configurations from bsn as json
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
		io.emit('chart_info', packet , { for: 'everyone' });
    });
});

function send_stop_signal() {
	var url = 'http://127.0.0.1:5000/stop';
	request(url, function (error, response, body) {
		if(error != null || response && response.statusCode != 200 || body != 'ok') {
			console.log('error:', error);
			console.log('statusCode:', response && response.statusCode);
			console.log('body:', body);

			// Emit to client error ocurred
			io.emit('bsn_info', body);
		}
		else {
			// Emit to client that it should proceed
			io.emit('bsn_info', 'ok');
		}
	});
		
}

// Http request to start bsn
function send_start_signal(path) {
	console.log('Path: ' + path);
	var url = 'http://127.0.0.1:5000/start?path=' + path;		
	request(url, function (error, response, body) {
		if(error != null || response && response.statusCode != 200 || body != 'ok') {
			console.log('error:', error);
			console.log('statusCode:', response && response.statusCode);
			console.log('body:', body);

			// Emit to client error ocurred
			io.emit('bsn_info', body);
		}
		else {
			// Emit to client that it should proceed
			io.emit('bsn_info', 'ok');
		}		
	});
}

io.on('connection', function(socket) {
	// Wait for start or stop message
	socket.on('bsn_info', function(msg) {
		
		if(msg == 'stop') {
			send_stop_signal();
		}
		// If the message is a start request send signal to bsn api
		else if(msg.search('start:') != -1) {
			var path = msg.replace('start:','');
			send_start_signal(path)
		}		
	});
});

server.listen(6060, function() { 
	console.log('server is listening');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});