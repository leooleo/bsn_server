// Firebase configurations
var firebase_config = {
    apiKey: "AIzaSyCzp5dmdyQBhIe_Qu7GDYrdfzxc_8U2a3I",
    authDomain: "my-project-1516369881504.firebaseapp.com",
    databaseURL: "https://my-project-1516369881504.firebaseio.com",
    projectId: "my-project-1516369881504",
    storageBucket: "my-project-1516369881504.appspot.com",
    messagingSenderId: "123204586316"
};

// Chart configurations
var config = {
    type: 'line',
    data: {
        labels: [],
        datasets: [
        {
            label: 'Thermometer',
            backgroundColor: window.chartColors.red,
            borderColor: window.chartColors.red,
            data: [],
            fill: false,
        }, 
        {
            label: 'ECG',
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            data: [],
            fill: false,
        },
        {
            label: 'Oximeter',
            backgroundColor: window.chartColors.green,
            borderColor: window.chartColors.green,
            data: [],
            fill: false,
        }, 
        {
            label: 'Bpms',
            backgroundColor: window.chartColors.yellow,
            borderColor: window.chartColors.yellow,
            data: [],
            fill: false,
        }, 
        {
            label: 'Bpmd',
            backgroundColor: window.chartColors.orange,
            borderColor: window.chartColors.orange,
            data: [],
            fill: false,
        }]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'Battery chart'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{						
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }],
            yAxes: [{
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: 100
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Sensor battery(%)'
                }
            }]
        }
    }
};

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

// Transforms a string packet into variables
function split_packet(packet) {
    var batteries = packet.split('&')[0].split(',');        

    return {batteries: batteries};
}

function get_current_time() {
    var date = new Date;			
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    

    return (hour + ':' + minutes + ':' + seconds);
}

function update_batteries_chart(packet) {			
    var time_stamp = get_current_time();

    for(var i=0; i < 5; i++) {
        config.data.datasets[i].data.push(packet.batteries[i]);        
    }
    config.data.labels.push(time_stamp);

    // Consume first packet if there are at least 10 packets
    if(config.data.datasets[0].data.length > 9) {
        for(var i=0; i < 5; i++) {
            config.data.datasets[i].data.splice(0,1);
        }
        config.data.labels.splice(0,1);
    }    

    window.myLine.update();
}

firebase.initializeApp(firebase_config);

var nameRef = firebase.database().ref().child('sessions/' + getUrlParameter('session'));

window.onload = function() {
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);    
};

nameRef.on('value', function(snap) {
    var msg = snap.val()['data'];
    var splitted_packet = split_packet(msg);
    update_batteries_chart(splitted_packet);    
});
