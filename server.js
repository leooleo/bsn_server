var express = require('express');
var app = require('express')();
const fs = require('fs');
var http = require('http').Server(app);
var databaseUrl = 'https://my-project-1516369881504.firebaseio.com/'


function createCHconfig (urlToConnect) {
	var chConfiguration = "<launch>\r\n\t<node name=\"centralhub\" pkg=\"centralhub\" type=\"centralhub\" output=\"screen\" \/>\r\n\r\n\t<param name=\"connect\" value=\"true\" type=\"bool\" \/>"
	chConfiguration += "\n\t<param name=\"db_url\" value=\""
	chConfiguration += urlToConnect + '\"\/>\r\n'
	chConfiguration += "\t<param name=\"persist\" value=\"true\" type=\"bool\" \/>\r\n\r\n\t<param name=\"path\" value=\"centralhub_output.csv\" \/>\r\n\r\n<\/launch>"	
	
	return chConfiguration;
}

function getAvailableConfigurations() {
	return fs.readdirSync('./files/configs');
}

app.use("/files", express.static(__dirname + "/files"));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/files/html/home.html');
});

app.get('/vitalsMonitor', function (req, res) {
	res.sendFile(__dirname + '/files/html/vitals_chart.html');
});

app.get('/batteryMonitor', function (req, res) {
	res.sendFile(__dirname + '/files/html/battery_chart.html');
});

app.get('/reliabilityCostMonitor', function (req, res) {
	res.sendFile(__dirname + '/files/html/reliability_cost_chart.html');
});

app.get('/custom', function (req, res) {
	res.sendFile(__dirname + '/files/html/customize.html');
});

app.get('/getConfigs', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ configurations: getAvailableConfigurations()}));
});

app.get('/createConfig', function (req, res) {
	
	console.log(req.query);
	res.send(req.query);
	// res.send('<h1>Success</h1>');
});

app.get('/setUpBSNConfig', function (req, res) {
	var obj = JSON.parse(fs.readFileSync('files/configs/' + req.query.config, 'utf8'));
	obj.chConfig = createCHconfig(req.query.url);
		
	res.send('ok');
});



http.listen(3000, function () {
	console.log('listening on *:3000');
	// console.log(getAvailableConfigurations());
});

