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

// Add options to sessions bar
function add_sessions(sessions_count) {
    for (let i = 0; i < sessions_count; i++) {
        $('#sessions_select_bar').append($('<option>', {
            value: (i + 1),
            text: (i)
        }));
    }
}

$('#session_monitor_btn').click(function () {
    var selected_session = $('#sessions_select_bar').find(":selected").text();

    // Ask user to select something
    if (selected_session == '...') {
        alert('Please select a session');
        return;
    }
    // window.open('/createCHconfig?session=' + selected_session);    

    window.location.replace('/vitalsMonitor?session=' + selected_session);

    linksArray = ['/batteryMonitor?session=' + selected_session, '/reliabilityCostMonitor?session=' + selected_session]
    for (let i = 0; i < linksArray.length; i++) {
        window.open(linksArray[i]);
    }
    
    // window.open('/batteryMonitor?session=' + selected_session);
    // window.open('/reliabilityCostMonitor?session=' + selected_session);
});

$(document).ready(function () {
    firebase.database().ref('/sessions').once('value').then(function (snapshot) {
        var sessions_count = snapshot.val().length
        add_sessions(sessions_count)
    });
});
