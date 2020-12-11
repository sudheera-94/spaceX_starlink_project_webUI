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

    /**
     * Ajax get request
     * @param newUrl Url used to get data
     */
    function startJsonSession(newUrl) {
        $.ajax({
            type: "GET",
            url: newUrl,
            contentType: "application/json",
            crossDomain: true,
            success: function (data) {
                console.log(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
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
    });
});