// Firebase configurations
var firebase_config = {
    apiKey: "AIzaSyCzp5dmdyQBhIe_Qu7GDYrdfzxc_8U2a3I",
    authDomain: "my-project-1516369881504.firebaseapp.com",
    databaseURL: "https://my-project-1516369881504.firebaseio.com",
    projectId: "my-project-1516369881504",
    storageBucket: "my-project-1516369881504.appspot.com",
    messagingSenderId: "123204586316"
};

var batteryConfig = {
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
    var splitted = packet.split('#');
    var reliabilityCosts = splitted[0].split(',');    
    var batteries = splitted[1].split('&')[0].split(',');

    return { batteries: batteries, reliabilityCosts: reliabilityCosts };
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

    for (var i = 0; i < 5; i++) {
        batteryConfig.data.datasets[i].data.push(packet.batteries[i]);        
    }
    
    batteryConfig.data.labels.push(time_stamp);

    // Consume first packet if there are at least 10 packets
    if (batteryConfig.data.datasets[0].data.length > 9) {
        for (var i = 0; i < 5; i++) {
            batteryConfig.data.datasets[i].data.splice(0, 1);            
        }
        batteryConfig.data.labels.splice(0, 1);        
    }

    window.battery.update();    
}

$("a").click(function(){    
    // If user is already on that page nothing shall be done
    if(this.className == 'active') {
        return
    }
    window.location.replace('/' + this.className + '?session=' + getUrlParameter('session'));
});

firebase.initializeApp(firebase_config);

var nameRef = firebase.database().ref().child('sessions/' + getUrlParameter('session'));

window.onload = function () {
    var ctx = document.getElementById('batteryCanvas').getContext('2d');
    window.battery = new Chart(ctx, batteryConfig);
};

nameRef.on('value', function (snap) {
    var msg = snap.val()['data'];
    var splitted_packet = split_packet(msg);
    update_batteries_chart(splitted_packet);
});
