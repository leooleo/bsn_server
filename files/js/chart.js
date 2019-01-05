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

var socket = io();

// Stop simmulation on button click
$('#stop_sim').click( function() {			
    socket.emit('bsn_info', 'stop' );
});

window.onload = function() {
    var ctx = document.getElementById('canvas').getContext('2d');			
    window.myLine = new Chart(ctx, config);			
};

function split_packet(packet) {
    var color = packet.split('-')[1];
    var sensors = packet.split('/');
    // console.log(sensors);
    var raw_packets = []
    var evaluated_packets = []
    var patient_status = sensors[sensors.length -1].split('-')[0];
    for(var i=0; i < 5; i++) {
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

    for(var i=0; i < 5; i++){
        config.data.datasets[i].data.push(packet.eval[i]);
    }
    config.data.labels.push(time_stamp);
    window.myLine.update();
}

function update_status_circle(packet) {

    var color = packet.color;
    // Remove as casas decimais e adiciona o ícone de porcentagem
    var patient_status = (parseInt(packet.patient_status)) + '%';

    $(".cirlce_contents").fadeOut(function() {        
        $("#outer-circle").animate({backgroundColor: color}, 250);
        $('.cirlce_contents').text(patient_status).fadeIn(250);    
    });
}

function update_raw_data(packet) {
    console.log(packet.raw);
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
    console.log(display_packet);
    

    $('#raw_data').text(display_packet).fadeIn(250);    
    
}

socket.on('chart_info', function(msg) {			
    var splitted_packet = split_packet(msg);
    update_sensors_chart(splitted_packet);
    update_status_circle(splitted_packet);
    update_raw_data(splitted_packet);
});