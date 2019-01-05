$('#danger_message_group').hide();
var socket = io();

// Add options to select bar
function add_options(object) {
    options_text = []            
    json_data = object
    
    // Create array of strings based on categorie -> subcategorie
    for(categorie in json_data) {
        for(subcategorie in json_data[categorie]){
            options_text.push('By ' + categorie + ' on ' + json_data[categorie][subcategorie])                    
        }
    }

    // Add sorted strings to select bar
    options_text.sort();
    for(i in options_text) {
        $('#select_bar').append($('<option>', {
            value: (i+1),
            text: options_text[i]
        }));             
    }            
}

$( document ).ready(function() {            
    var configurations = '';
    $.ajax({
        url: '/config',                       
        success : function(json) {
            configurations = json;
            add_options(json);
        }
    });            
});

$( '#sim_monitor' ).click(function() {
    window.location.href = '/monitor';
});
$( '#sim_stop' ).click(function() {
    socket.emit('bsn_info', 'stop' );
    socket.on('bsn_info', function(msg) {
        if(msg != 'ok') {
            alert('Bsn couldn\'t stop: ' + msg);
        }
        else {            
            $('#danger_message_group').hide();
            window.location.href = '/';
        }
        
    });
});

$( '#sim_start' ).click(function() {    
    // Get configuration selected
    var select = $('#select_bar').find(":selected").text();            

    // Ask user to select something
    if(select == '...') {
        alert('Please select a property');
        return;
    }

    select = select.replace('By ', '')
    select = select.replace(' on ', '/')

    // Send to bsn start signal and path to configuration
    socket.emit('bsn_info', 'start:' + select);  
    socket.on('bsn_info', function(msg) {
        if(msg == 'already started') {
            var message = 'Bsn ' + msg + ', would you like to stop or monitor it?'
            $('#danger_message').html(message);
            $('#danger_message_group').show();
        }
        else if(msg != 'ok') {
            alert('Bsn couldn\'t start: ' + msg);
        }
        else {
            window.location.href = '/monitor';
        }
    });  
});