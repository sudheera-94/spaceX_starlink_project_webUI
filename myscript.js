var board = $('#board');
var prevX = 0;
var prevY = 0;

/**
 * Creating a 12x12 grid for monitor panel.
 * (0,0) :- bottom left corner
 * (11,11) :- top right corner
 * ids of each cell :- 'x-y'
 *
 * @constructor
 */
var Board = function () {
    var count = 0;
    for (var i = 0; i < 12; i++) {
        for (var j = 0; j < 12; j++) {
            var idStr = j + '-' + (11 - i);
            if (count % 12 == 0) {
                board.append('<div class="spot" id="' + idStr + '" style="clear: left"><div>')
            } else {
                board.append('<div class="spot" id="' + idStr + '"><div>')
            }
            count++;
        }
    }
}

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
     * Ajax get request for the satelliteMonitor
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

                var prevId = '#' + prevX + '-' + prevY;
                var nowId = '#' + data.xCoordinate + '-' + data.yCoordinate;
                $(prevId).css('backgroundColor', '#FFFFFF');
                $(nowId).css('backgroundColor', '#7FFF00');
                prevX = data.xCoordinate;
                prevY = data.yCoordinate;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                $(prevId).css('backgroundColor', '#FFFFFF');
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

    $(`#satelliteDecommission`).submit(function (event) {
        event.preventDefault();
        var newUrl = 'http://127.0.0.1:8001/add/' +  $('#satelliteDecommissionId').val();

        $.ajax({
            type: 'DELETE',
            url: newUrl,
            success: function (result) {
                // Look the current position from health check and remove it
            }
        })
    });

    /**
     * Calling the board function.
     */
    Board();
});