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


$.getJSON( "/getMarkovs", function( data ) {
    // console.log(data['configurations']);
    $.each(data['configurations'], function(index, configName){            
        configName = decodeConfigurationString(configName);
        $('#markovSelect').append(new Option(text= configName, value= configName));
    });
});

$('#submitButton').click(function() {
    var datastring = $("#fullfomrm").serialize();
    console.log(datastring);
});

  