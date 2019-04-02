var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var databaseUrl = 'https://my-project-1516369881504.firebaseio.com'

app.use("/files", express.static(__dirname + "/files"));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/files/html/home.html');
});

app.get('/createCHconfig', function(req, res){
	var sessionNumber = req.query.session;
	res.setHeader('Content-Type', 'application/json');
	
	var chConfiguration = "<launch>\r\n\t<node name=\"centralhub\" pkg=\"centralhub\" type=\"centralhub\" output=\"screen\" \/>\r\n\r\n\t<param name=\"connect\" value=\"true\" type=\"bool\" \/>"
	chConfiguration += "\n\t<param name=\"db_url\" value=\""
	chConfiguration += databaseUrl + 'sessions/' + sessionNumber + '.json\"\/>\r\n'
	chConfiguration += "\t<param name=\"persist\" value=\"true\" type=\"bool\" \/>\r\n\r\n\t<param name=\"path\" value=\"centralhub_output.csv\" \/>\r\n\r\n<\/launch>"

    res.end(JSON.stringify({ data: chConfiguration }));
});

app.get('/monitor', function(req, res) {
	res.sendFile(__dirname + '/files/html/chart.html');
});

app.get('/custom', function(req, res) {
	res.sendFile(__dirname + '/files/html/customize.html');
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});