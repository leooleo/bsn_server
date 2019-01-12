var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var getJSON = require('get-json');
var net = require('net');
var request = require('request');
var fs = require("fs");
var path = require('path');


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

// Read a config inside the configs folder
function read_configs_contents(file_name) {	
	var file_path = path.join(__dirname, 'files', 'configs', file_name);
	return fs.readFileSync(file_path, 'utf8');
}

// Create a custom config based on the protocols sent by the form at /custom
function create_custom_config(custom_params) {
	var static_content  = '';
	var dynamic_content = '';

	// Read static content and requested markov
	static_content = read_configs_contents('static');
	static_content += '\n';
	static_content += read_configs_contents(custom_params.markov);
	static_content += '\n';

	delete custom_params.markov;

	for(var key in custom_params) {		
		var value = custom_params[key];
		dynamic_content += key + ' = ' + value + '\n';
	}

	return static_content + '\n' + dynamic_content;
}

// Send the custom configuration to the BSN
app.get('/send_config', function(req, res) {
	var file_name = req.query.name;
	delete req.query.name;
	var contents  = create_custom_config(req.query);

	// Send data as Json
	request({
		url: 'http://127.0.0.1:5000/new_conf',
		method: "POST",
		json: {'name': file_name, 'content': contents} 
	});
		 
	res.redirect('/');
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

// Returns a color based on patient status
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