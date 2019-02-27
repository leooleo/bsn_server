var express = require('express');
var app = require('express')();
var http = require('http').Server(app);

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


http.listen(3000, function(){
  console.log('listening on *:3000');
});