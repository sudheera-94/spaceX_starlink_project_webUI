var rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var board = $('#board');

var Board = function () {
    var count = 0;
    for (var i = 0; i < 12; i++) {
        for (var j = 0; j < 12; j++) {
            var idStr = j + ',' + (11-i);
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
                var satellite_data = '';
                satellite_data += '<tr>';
                satellite_data += '<td>' + data.satelliteName + '</td>';
                satellite_data += '<td>' + data.satelliteId + '</td>';
                satellite_data += '<td>' + data.xCoordinate + '</td>';
                satellite_data += '<td>' + data.yCoordinate + '</td>';
                satellite_data += '<td>' + data.comments + '</td>';
                satellite_data += '</tr>';
                $('#monitorPanelTable').append(satellite_data);
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

    Board();
});