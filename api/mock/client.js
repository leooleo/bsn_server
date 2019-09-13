var fs = require('fs'),
  path = require('path'),
  filePath = path.join(__dirname, 'mock_data.txt');
var request = require('request');
var sleep = require('system-sleep');



function addData() {
  sleep(4000);
  for (let index = 0; index < lines.length; index += 2) {    
    request.post(
      'http://localhost:8081/sendVitalData',
      { json: { vitalData: lines[index] } },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
        }
      }
    );

    var reliability = lines[index + 1].split(',')[0];
    var cost = lines[index + 1].split(',')[1];
    request.post(
      'http://localhost:8081/sendRelCosData',
      { json: { reliability: reliability, cost: cost } },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
        }
      }
    );

    sleep(1000);
  }
}

var lines = (fs.readFileSync(filePath, 'utf8')).split('\r\n');
addData();