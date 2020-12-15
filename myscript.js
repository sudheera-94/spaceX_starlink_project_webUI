var board = $('#board');
var prevX = 0;
var prevY = 0;
var postUrlsList = ['http://127.0.0.1:8001/add/'];
var newUrl;

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
        event.preventDefault();

        var formValues = {
            'satelliteName': $('input[name=satelliteName]').val(),
            'satelliteId': $('input[name=satelliteId]').val(),
            'xCoordinate': $('input[name=xCoordinate]').val(),
            'yCoordinate': $('input[name=yCoordinate]').val(),
            'comments': $('input[name=comments]').val()
        };

        $.each(postUrlsList, function (i, u) {
            $.ajax(u, {
                type: 'POST',
                data: formValues,
                dataType: 'json',
                encode: true
            }).done(function (data) {
                console.log(data)
            })
        });

    });

    /**
     * triggers when submit button of the satelliteMonitor is pressed
     * gets data from the add microservice.
     */
    $(`#satelliteMonitor`).submit(function (event) {
        event.preventDefault();

        // var newUrl = 'http://127.0.0.1:8001/add/' + $('#monitorSatelliteId').val() + "?&format=json&jsoncallback=?";
        // // console.log(newUrl);
        // startJsonSession(newUrl);

        newUrl = 'http://127.0.0.1:8002/healthCheck/' + $('#monitorSatelliteId').val() + "?&format=json&jsoncallback=?";
        poll(newUrl);
    });

    /**
     * triggers when when submit button of the satelliteDecommission is pressed
     * removes the relevant id from microservices.
     */
    $(`#satelliteDecommission`).submit(function (event) {
        event.preventDefault();
        var newUrl = 'http://127.0.0.1:8001/add/' + $('#satelliteDecommissionId').val();

        $.ajax({
            type: 'DELETE',
            url: newUrl,
            success: function (result) {
                // Look the current position from health check and remove it
            }
        })
    });

    var healthState = $(`#healthState`),
        poll = function (newUrl) {
            console.log(newUrl);

            $.ajax({
                type: "GET",
                url: newUrl,
                contentType: "application/json",
                crossDomain: true,
                success: function (data) {
                    console.log(data);
                    healthState.text(data.healthPercentage);

                    var prevId = '#' + prevX + '-' + prevY;
                    var nowId = '#' + data.xCoordinate + '-' + data.yCoordinate;
                    $(prevId).css('backgroundColor', '#FFFFFF');
                    $(nowId).css('backgroundColor', '#7FFF00');
                    prevX = data.xCoordinate;
                    prevY = data.yCoordinate;
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    var prevId = '#' + prevX + '-' + prevY;
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                    $(prevId).css('backgroundColor', '#FFFFFF');
                }
            });
        },

        pollInterval = setInterval(function () {
            poll(newUrl);
        }, 2000);


    $(`#satelliteControl`).submit(function (event) {
        event.preventDefault();

        var formValues = {
            'satelliteId': $("input[name=satelliteControlId]").val(),
            'xVelocity': $("input[name=xVelocity]").val(),
            'yVelocity': $("input[name=yVelocity]").val(),
        };

        $.ajax({
            type: 'POST',
            url: 'http://127.0.0.1:8002/healthCheck/',
            data: formValues,
            dataType: 'json',
            encode: true
        }).done(function (data) {
            console.log(data)
        });

    });

    /**
     * Calling the board function.
     */
    Board();
});