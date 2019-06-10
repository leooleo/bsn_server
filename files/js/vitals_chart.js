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
        },
        {
            label: 'Acc',
            backgroundColor: window.chartColors.purple,
            borderColor: window.chartColors.purple,
            data: [],
            fill: false,
        }]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        title: {
            display: true,
            text: 'Evaluated packets'
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
                    labelString: 'Risk to patient health(%)'
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
    var packet = packet.split('&')[1];    
    var color = packet.split('-')[1];
    // Divide by sensors
    var sensors = packet.split('/');        
    // The last splitted packet shall be the patient general status
    var patient_status = sensors[sensors.length -1].split('-')[0];
    var raw_packets = []
    var evaluated_packets = []

    for(var i=0; i < 6; i++) {
        var evl_pack = sensors[i].split('=')[0]
        var raw_pack = sensors[i].split('=')[1]
        
        raw_packets.push(raw_pack);
        evaluated_packets.push(evl_pack);
    }    

    return {raw: raw_packets, eval: evaluated_packets, patient_status: patient_status, color: color};
}

function get_current_time() {
    var date = new Date;			
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    

    return (hour + ':' + minutes + ':' + seconds);
}

function update_sensors_chart(packet) {			
    var time_stamp = get_current_time();

    for(var i=0; i < 6; i++) {
        config.data.datasets[i].data.push(packet.eval[i]);        
    }
    config.data.labels.push(time_stamp);

    // Consume first packet if there are at least 10 packets
    if(config.data.datasets[0].data.length > 9) {
        for(var i=0; i < 6; i++) {
            config.data.datasets[i].data.splice(0,1);
        }
        config.data.labels.splice(0,1);
    }    

    window.myLine.update();
}

function update_status_circle(packet) {

    var color = packet.color;
    // Remove decimal cases and put percentage char
    var patient_status = (parseInt(packet.patient_status)) + '%';

    // Update css
    $(".cirlce_contents").fadeOut(function() {        
        $("#outer-circle").animate({backgroundColor: color}, 250);
        $('.cirlce_contents').text(patient_status).fadeIn(250);    
    });
}

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

// Display the new raw data above the circle
function update_raw_data(packet) {
    var t  = parseFloat(packet.raw[0]).toFixed(2);
    var e  = parseFloat(packet.raw[1]).toFixed(2);
    var o  = parseFloat(packet.raw[2]).toFixed(2);
    var bs = parseFloat(packet.raw[3]).toFixed(2);
    var bd = parseFloat(packet.raw[4]).toFixed(2);
    
    var display_packet = t.toString() + 'º    ' 
    display_packet += e.toString() + 'bpm    '
    display_packet += o.toString() + '%    ';
    display_packet += bs.toString() + 'mmhg    ';
    display_packet += bd.toString() + 'mmhg';
    

    $('#raw_data').text(display_packet).fadeIn(250);    
}



$("a").click(function(){    
    // If user is already on that page nothing shall be done
    if(this.className == 'active') {
        return
    }
    window.location.replace('/' + this.className + '?session=' + getUrlParameter('session'));
});

$('#stop_sim').click(function() {
    $.get('/stopSession?session=' + + getUrlParameter('session'), function(data) {
        console.log(data);
    });
});

firebase.initializeApp(firebase_config);

var nameRef = firebase.database().ref().child('sessions/' + getUrlParameter('session'));

window.onload = function() {
    var ctx = document.getElementById('canvas').getContext('2d');			
    window.myLine = new Chart(ctx, config);    
};

nameRef.on('value', function(snap) {
    var msg = snap.val()['VitalData'];
    var color = get_correspondant_color(msg);
    var splitted_packet = split_packet(msg + '-' + color);
    update_sensors_chart(splitted_packet);
    update_status_circle(splitted_packet);
    update_raw_data(splitted_packet);
});
