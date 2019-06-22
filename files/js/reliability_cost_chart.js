// Firebase configurations
var firebase_config = {
    apiKey: "AIzaSyCzp5dmdyQBhIe_Qu7GDYrdfzxc_8U2a3I",
    authDomain: "my-project-1516369881504.firebaseapp.com",
    databaseURL: "https://my-project-1516369881504.firebaseio.com",
    projectId: "my-project-1516369881504",
    storageBucket: "my-project-1516369881504.appspot.com",
    messagingSenderId: "123204586316"
};



var costConfig = {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Cost',
                backgroundColor: window.chartColors.blue,
                borderColor: window.chartColors.blue,
                data: [],
                fill: false,
            }
            ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'Reliability/Cost chart'
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
                    labelString: 'Percentage'
                }
            }]
        }
    }
};

var reliabilityConfig = {
    type: 'line',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Reliability',
                backgroundColor: window.chartColors.red,
                borderColor: window.chartColors.red,
                data: [],
                fill: false,
            }
            ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'Reliability/Cost chart'
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
                    labelString: 'Percentage'
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
    console.log(packet);
    var splitted_packet = packet.split(','); 
console.log(splitted_packet);
    return { reliability: splitted_packet[0], cost: splitted_packet[1] };
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

    reliabilityConfig.data.datasets[0].data
    costConfig.data.datasets[0].data

    reliabilityConfig.data.datasets[0].data.push(packet.reliability);
    costConfig.data.datasets[0].data.push(packet.cost);
    
    
    reliabilityConfig.data.labels.push(time_stamp);
    costConfig.data.labels.push(time_stamp);    

    // Consume first packet if there are at least 10 packets
    if (reliabilityConfig.data.datasets[0].data.length > 9) {
        costConfig.data.labels.splice(0, 1);
        reliabilityConfig.data.labels.splice(0, 1);
    }

    window.costConfig.update();
    window.reliabilityConfig.update();
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
    var ctx = document.getElementById('costCanvas').getContext('2d');
    window.costConfig = new Chart(ctx, costConfig);

    ctx = document.getElementById('reliabilityCanvas').getContext('2d');
    window.reliabilityConfig = new Chart(ctx, reliabilityConfig);
};

nameRef.on('value', function (snap) {
    var msg = snap.val()['RelCos'];
    var splitted_packet = split_packet(msg);
    update_batteries_chart(splitted_packet);
});
