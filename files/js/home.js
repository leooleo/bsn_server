var databaseUrl = 'https://my-project-1516369881504.firebaseio.com/sessions/'

// Initialize Firebase
var firebase_config = {
    apiKey: "AIzaSyCzp5dmdyQBhIe_Qu7GDYrdfzxc_8U2a3I",
    authDomain: "my-project-1516369881504.firebaseapp.com",
    databaseURL: "https://my-project-1516369881504.firebaseio.com",
    projectId: "my-project-1516369881504",
    storageBucket: "my-project-1516369881504.appspot.com",
    messagingSenderId: "123204586316"
};

firebase.initializeApp(firebase_config);

function decodeConfigurationString(encodedString) {
    encodedString = encodedString.replace('_',' on ');
    encodedString = encodedString.replace('-',' ');
    encodedString = encodedString.replace('.json', '');

    return encodedString;
}

function encodeConfigurationString(encodedString) {
    encodedString = encodedString.replace(' on ', '_');
    encodedString = encodedString.replace(' ', '-');
    encodedString += '.json';

    return encodedString;
}

$('#session_monitor_btn').click(function () {
    var selectedConfiguration = $('#configurationSelect').find(":selected").text();
    selectedConfiguration = encodeConfigurationString(selectedConfiguration);

    // Add a session
    firebase.database().ref('/sessions').once('value').then(function (snapshot) {
        var sessionsCount = snapshot.val().length                        
        firebase.database().ref("sessions/" + sessionsCount).set({data: '...'});

        var configuration = {}
        configuration.url = databaseUrl + sessionsCount + '.json'

        configuration.config = selectedConfiguration;        
    
        $.ajax({
            url: "setUpBSNConfig",
            data: { 
                "url": configuration.url, 
                "config": configuration.config
            },
            cache: false,
            type: "GET",
            success: function(response) {
                console.log(response);
                window.location.replace('/vitalsMonitor?session=' + sessionsCount);
            },
            error: function(xhr) {
                alert('An error ocurred ' + xhr);
            }
        });        
    });
    
    
});

$(document).ready(function () {
    // firebase.database().ref('/sessions').once('value').then(function (snapshot) {
    //     var sessions_count = snapshot.val().length        
    // });


    $.getJSON( "http://localhost:3000/getConfigs", function( data ) {
        $.each(data['configurations'], function(index, configName){            
            configName = decodeConfigurationString(configName);
            $('#configurationSelect').append(new Option(text= configName, value= configName));
        });
    });
});
