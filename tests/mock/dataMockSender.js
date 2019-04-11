var firebase = require("firebase");
var fs = require('fs');
var sleep = require('system-sleep');

    
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCzp5dmdyQBhIe_Qu7GDYrdfzxc_8U2a3I",
    authDomain: "my-project-1516369881504.firebaseapp.com",
    databaseURL: "https://my-project-1516369881504.firebaseio.com",
    projectId: "my-project-1516369881504",
    storageBucket: "my-project-1516369881504.appspot.com",
    messagingSenderId: "123204586316"
};

function add_data(){ 
    // sleep(5000);

    for (let i = 0; i < lines.length; i++) {
        console.log('new data ' + i.toString());
        nameRef.update({'data': lines[i]});
        sleep(2000);
    } 
}

firebase.initializeApp(config);

const nameRef = firebase.database().ref().child('sessions/0');

var lines = (fs.readFileSync('out.txt', 'utf8')).split('\n');

add_data();