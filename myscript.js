$(document).ready(function () {

    /**
     * triggers when submit button of the satelliteAdd is pressed
     * sends data to the add microservice.
     */
    $(`#satelliteAdd`).submit(function (event) {

        var formValues = {
            'satelliteName': $('input[name=satelliteName]').val(),
            'satelliteId': $('input[name=satelliteId]').val(),
            'xCoordinate': $('input[name=xCoordinate]').val(),
            'yCoordinate': $('input[name=yCoordinate]').val(),
            'comments': $('input[name=comments]').val()
        };

        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8001/add/',
            data: formValues,
            dataType: 'json',
            encode: true
        }).done(function (data) {
            console.log(data)
        });
        event.preventDefault();
    });

    function startJsonSession(newUrl) {
        $.ajax({
            type: "GET",
            url: newUrl,
            dataType: "jsonp",
            contentType: "application/json",
            crossDomain: true,
            headers: {
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'application/json',
            },
            success: function (data) {
                // var satelliteId = data[0].satelliteId;
                // alert(satelliteId);
                console.log(data);
            }
        });
        // fetch(newUrl, {
        //     method: 'GET',
        //     body: JSON.stringify(data),
        //     mode: 'cors',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "Accept": 'application/json',
        //     }
        // })
        //     .then((data) => data.json())
        //     .then((resp) => console.log(resp))
        //     .catch((err) => console.log(err))
    };

    /**
     * triggers when submit button of the satelliteMonitor is pressed
     * gets data from the add microservice.
     */
    $(`#satelliteMonitor`).submit(function (event) {
        event.preventDefault();

        var newUrl = 'http://127.0.0.1:8001/add/' + $('#monitorSatelliteId').val() + "?&format=json&jsoncallback=?";
        console.log(newUrl);
        startJsonSession(newUrl);
        // $.getJSON(newUrl, function (result) {
        //     $.each(result, function (i, field) {
        //         $("#monitorPanel").append(field + " ");
        //     });
        // });
    });
});