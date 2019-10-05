// var dealerCode;
// var fseLocInput;
// var mapZoom;
var map;
var caseLookup = [];
var dealerMark = [];
var fseSaved = [];
var geoKey = "fCURbHxAzoqUZmVp1Hk2QPlHRB1ErPlN";


var cat = $("#cat").val().trim();
var fseName = $("#fseNameTrig").val().trim();

savedCaseGet();
noteSave();

// caseSavePop();

// db ajax get / call
$.ajax({
    url: 'fseData.php',
    type: 'get',
    dataType: 'JSON',
    success: function(fseData) {
        // console.log('AJAX call was successful!');
        // console.log('Data from the server', fseData);
        dataPopulate(fseData);
    },
    error: function(req, err) {
        alert('There was some error performing the AJAX call! ' + err);
    }
});

function savedCaseGet() {

    fseSaved = [];

    $("#scData").empty();

    $.ajax({
        url: 'saveCase.php',
        type: 'get',
        dataType: 'JSON',
        success: function(savedJson) {
            // console.log('AJAX call was successful!');
            // console.log('Data from the server', savedJson);
            // console.log('fse: ', cat);

            fseSaved = savedJson.filter(function(savedJson) {
                return savedJson.fseId === cat;
            });

            // console.log('after filter', fseSaved);

            caseSaveTable(fseSaved);
            caseDeleteFunct(fseSaved);
        },
        error: function(req, err) {
            alert('No saved cases, or there was an error performing the AJAX call! ' + err);
        }
    });

}

// function reload(form) {
//     var val = cat
//     self.location = 'portal.php?cat=' + val;
// }

function rotateBack() {
    var boxType = $('#tsb').attr('class');
    if (boxType == "camp_tsb") $('#tsb').attr('class', 'camp_camp');
    if (boxType == "camp_camp") $('#tsb').attr('class', 'camp_tsb');
    setTimeout(rotateBack, 2500);
}

function pageToggle() {

    savedCaseGet();
    // caseSaveTable();
    // caseDeleteFunct();
    // noteSave();
    // caseSave = [];
    // caseSavePop();

    var $div1 = $('#tlCard'),
        $div2 = $('#workBench')

    if ($div1.is(':visible')) {
        $div1.hide();
        $div2.show();
    } else if ($div1.is(':visible') && $div2.is(':hidden')) {
        $div2.show();
    } else {
        $div1.show();
        $div2.hide();
    }
}

function getGoals() {
    window.open("_blank").location.href = "fse_goals.php?cat=" + cat;
    return false;
}
rotateBack();


function dataPopulate(fseData) {
    // console.log('all data: ', fseData);

    var results = [];

    for (var i = 0; i < fseData.length; i++) {
        if (fseData[i].fseData.fseId === cat) {
            results.push(fseData[i]);
        }
    }

    // raw map location data, based on db values from fse_list
    var fseLat = parseFloat(results[0].fseData.fseLat);
    var fseLng = parseFloat(results[0].fseData.fseLng);

    // map location and zoom
    fseLoc = { lat: fseLat, lng: fseLng }

    mapZoom = results[0].fseData.mapZoom
    var mapZoomInt = parseInt(mapZoom);

    //loading gif show/hide as needed
    $(document).ready(function() {
        $(document).ajaxStart(function() {
            $("#map").hide();
            $("#loading").show();
        }).ajaxStop(function() {
            setTimeout(function() {
                $("#loading").hide();
                $("#map").show();
            }, 100);
        });
    });


    // initial map population
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: mapZoomInt,
        center: fseLoc,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true
    });

    // console.log("results: ", results);

    // var dealerLoc = [];

    // for (var i = 0; i < results.length; i++) {
    //     if (results[i].fseData.fseId === cat) {
    //         dealerLoc.push({
    //             caseNum: results[i].caseData.caseNum,
    //             htssCase: results[i].caseData.htssCaseNum,
    //             concern: results[i].caseData.concern,
    //             vin: results[i].caseData.vin,
    //             dealer: results[i].caseData.dealer,
    //             dealerName: results[i].dealerData.dealerName,
    //             lat: results[i].dealerData.dealerLat,
    //             lng: results[i].dealerData.dealerLng,
    //             date: results[i].caseData.lastContact,
    //             visits: results[i].caseData.visits,
    //             calls: results[i].caseData.callCount,
    //             fseLoc: fseLoc,
    //             mapZoomInt: mapZoomInt

    //         });
    //     }
    // }

    // console.log("dealerLoc: ", dealerLoc);

    // marker location object
    var markerGroup = [];
    var dealer = [];
    var dateSort = [];
    var dealerLoc = [];

    //data search
    $("#dsearch").on('click', function() {
        event.preventDefault();

        dealerLoc = [];
        // dateSort = [];
        dealer = [];

        $("#tlData").empty();
        $("#cases").empty();
        $("#cases").append(0);
        $("#saveCase").hide();

        dealerCode = $("#dealerCode").val().trim();
        visitAmt = $("#visitAmt").val().trim();
        callAmt = $("#callAmt").val().trim();

        var startDate = new Date($("#strtDte").val().trim());
        var endDate = new Date($("#endDte").val().trim());

        for (var i = 0; i < results.length; i++) {
            if (results[i].caseData.dealer === dealerCode) {
                // console.log('match');
                // console.log(results[i]);
                dealerLoc.push({
                    lat: parseFloat(results[i].dealerData.dealerLat),
                    lng: parseFloat(results[i].dealerData.dealerLng),
                    dealer: results[i].caseData.dealer,
                    dealerName: results[i].dealerData.dealerName
                });

            }
        }

        // console.log('results ', results);

        var visitSel = [];

        for (var i = 0; i < results.length; i++) {
            if (visitAmt === '1') {
                visitSel.push(results[i]);
            } else if (results[i].caseData.visits === visitAmt) {
                // console.log(results[i].caseData.visits);
                visitSel.push(results[i]);
            }
        };

        // console.log('visitSort ', visitSel);


        var finalSort = [];

        for (var i = 0; i < visitSel.length; i++) {
            if (callAmt === '%') {
                finalSort.push(visitSel[i]);
            } else if (visitSel[i].caseData.callCount === callAmt) {
                finalSort.push(visitSel[i]);
            }
        }

        // console.log('final sort ', finalSort);


        var filteredData = dateFilterer(finalSort, startDate, endDate);

        dateSort = filteredData.finalValues

        // console.log('before all ', dateSort);

        // console.log(dateSort.length === 0);


        if (dateSort.length === 0) {
            warning();
        } else if (dealerCode === 'all') {
            for (let i = 0; i < dateSort.length; i++) {

                localLat = parseFloat(dateSort[i].dealerData.dealerLat);
                localLng = parseFloat(dateSort[i].dealerData.dealerLng);

                markerGroup.push({
                    lat: localLat,
                    lng: localLng,
                    dealer: dateSort[i].caseData.dealer,
                    dealerName: dateSort[i].dealerData.dealerName
                });

                // console.log(markerGroup);


            }
            dealerClusterMap();
            caseSaveFunct();
            dataTable();
        } else {

            for (var i = 0; i < dateSort.length; i++) {
                if (dateSort[i].caseData.dealer === dealerCode) {
                    // console.log('inside if ', dateSort[i].caseData.dealer);
                    dealer.push(dateSort[i]);
                    // console.log('did this run?');

                }
                // else if (dateSort[i].caseData.dealer === null) {
                //     // console.log(dealerLoc);
                //     // console.log('or what it this?');


                // }
            }

            if (dealer.length > 0) {
                dateSort = dealer;
                oneDealerMap();
                caseSaveFunct();
                dataTable();
            } else {
                markerGroup = dealerLoc;
                warning();
                oneDealerMap();
            }
        }
    });


    function warning() {
        var warning = $('<tr>');
        var warnData = $('<td>');
        warnData.attr('colspan', '14');
        warnData.attr('id', 'noCase');
        warnData.text('No Records / Data Found (or search fields blank).');
        warning.append(warnData);
        $("#tlData").append(warning);
    }

    // date filter
    function dateFilterer(sourceValues, startDate, endDate) {

        function filterFunction_dates(sourceValue) {

            //Aim: To test if the tested date is valid within a particular range
            var rangeAcceptance = {
                minValid: new Date(sourceValue.caseData.lastContact) >= new Date(startDate),
                maxValid: new Date(sourceValue.caseData.lastContact) <= new Date(endDate)
            };

            var acceptanceResult; //boolean to determine if the relevant range specified is valid

            if (startDate != "" && endDate != "") {

                acceptanceResult = (rangeAcceptance.minValid && rangeAcceptance.maxValid);

            } else if (startDate != "") {

                acceptanceResult = rangeAcceptance.minValid;

            } else if (endDate != "") {

                acceptanceResult = rangeAcceptance.maxValid;

            } else {

                acceptanceResult = (1 == 1); //show all results if no specific range has been selected

            }

            return (acceptanceResult);

        }

        // console.log({

        //     originalValues: sourceValues,
        //     finalValues: sourceValues.filter(filterFunction_dates),
        //     "time of filter": new Date()

        // });

        //Return the data for display
        return ({

            originalValues: sourceValues,
            finalValues: sourceValues.filter(filterFunction_dates)

        });

    }

    function dealerClusterMap() {

        clearOverlays();

        // console.log('dealer info ', dealerInfo);

        // console.log('cluster markerGroup', markerGroup);

        // console.log(contentString);

        // var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var bounds = new google.maps.LatLngBounds();
        var infoWindow = new google.maps.InfoWindow();
        var markers = markerGroup.map(function(location, i) {
            bounds.extend(location);
            map.fitBounds(bounds);
            // console.log('in loop ', location.dealer);

            var marker = new google.maps.Marker({
                position: location,
                // label: labels[i % labels.length]
            });

            google.maps.event.addListener(marker, 'click', function() {

                // infoWindow.setContent('Dealer: ' + location.dealer);
                infoWindow.setContent('<div id=popUp>' +
                    '<div id="dCode"> ' + location.dealer + '</div>' +
                    '<div id="dName"> ' + location.dealerName + '</div>' +
                    '</div>');
                // infoWindow.setContent(location.info);
                infoWindow.open(map, marker);
            })
            return marker;
        });


        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });

        markerGroup = [];
        $("#dsearch").on('click', function() {
            markerCluster.removeMarkers(markers);
        });
    }

    var markersArray = [];

    function oneDealerMap() {

        clearOverlays();

        console.log('dealerLoc ', dealerLoc);


        // console.log(markerGroup);

        // marker location placement
        var eventMarker = {
            lat: dealerLoc[0].lat,
            lng: dealerLoc[0].lng
        };

        // console.log(eventMarker);

        // console.log(dealer);

        //marker popup data display
        var contentString = '<div id=popUp>' +
            '<div id="title"> ' + dealerLoc[0].dealer + '</div>' +
            '<div id="venue"> ' + dealerLoc[0].dealerName + '</div>' +
            // '<div id=""></div>' +
            '</div>';

        //marker popup window command
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        //marker popup creation / placement (from ticketmaster api data population)
        marker = new google.maps.Marker({
            position: eventMarker,
            map: map
        });

        var marker_position = eventMarker;
        marker.setPosition(marker_position);
        markersArray.push(marker);

        //click listener to populate the marker information popup
        google.maps.event.addListener(marker, 'click', function() {
            if (!marker.open) {
                infowindow.open(map, marker);
                marker.open = true;
            } else {
                infowindow.close();
                marker.open = false;
            }
            google.maps.event.addListener(map, 'click', function() {
                infowindow.close();
                marker.open = false;
            });
        });

        markerGroup = [];

    }

    function clearOverlays() {
        for (var i = 0; i < markersArray.length; i++) {
            markersArray[i].setMap(null);
        }
        markersArray = [];
    }

    //data table population
    function dataTable() {
        $("#tlData").empty();
        var cases = 0;
        // console.log('run');

        // console.log('Incoming dateSort ', dateSort.length);

        cases = dateSort.length;
        $("#cases").empty();
        $("#cases").append(cases);

        if (cases > 0) {
            $("#saveCase").show();
        }

        // console.log('dateSort length: ', dateSort.length);

        var techViewer = "http://10.112.5.10/vinoogle/techviewer.php?caseNum=";
        var htssLogin = "https://connect.tecklinks.com";
        var eReport = "https://gds.hyundaitechinfo.com:447/eReport/diaglist.aspx?&uid="
        var vinQuest = "http://10.112.5.10/vinoogle/_vinoogle.php?vinnum="

        for (let i = 0; i < dateSort.length; i++) {

            //data table population
            var row = $("<tr>");
            row.attr('class', 'dataRow');

            var select = $("<th>");
            select.attr('scope', 'row');
            select.attr('title', 'select to save case');
            select.html("<input type='checkbox' value='" + [i] + "' id='dataSelect' name='caseSelect' class='selected'>");

            var caseNum = $("<td>");
            caseNum.attr('id', 'caseNum');
            caseNum.attr('name', 'info');
            var caseLink = $("<a>");
            caseLink.attr('href', techViewer + dateSort[i].caseData.caseNum);
            caseLink.attr('target', 'target="_blank"')
            caseLink.attr('title', dateSort[i].caseData.concern + " Dealer Technician: " + dateSort[i].caseData.technician);
            caseLink.html('<p id="data1">' + dateSort[i].caseData.caseNum);
            caseNum.append(caseLink);

            var htssCase = $("<td>");
            htssCase.attr('id', 'htssCase');
            var htssLink = $("<a>");
            htssLink.attr('href', htssLogin);
            htssLink.attr('target', 'target="_blank"');
            htssLink.attr('title', 'HTSS Connect Login');
            htssLink.text(dateSort[i].caseData.htssCaseNum);
            htssCase.append(htssLink);

            var fseName = $("<td>");
            fseName.attr('id', 'fseName');
            fseName.append(dateSort[i].fseData.fse);

            var dealerCode = $("<td>");
            dealerCode.attr('id', 'dCode');
            dealerCode.attr('name', 'info');
            var eRepLink = $("<a>");
            eRepLink.attr('href', eReport + dateSort[i].caseData.dealer + "GDS&cpcode=B28AA" + dateSort[i].caseData.dealer + "&vin=" + dateSort[i].caseData.vin + "&device=GDSM");
            eRepLink.attr('target', 'target="window()"');
            eRepLink.attr('title', dateSort[i].dealerData.dealerName + ' eReport Information');
            eRepLink.text(dateSort[i].caseData.dealer);
            dealerCode.append(eRepLink);

            var visits = $("<td>").append(dateSort[i].caseData.visits);
            visits.attr('id', 'visits');

            var calls = $("<td>").append(dateSort[i].caseData.callCount);
            calls.attr('id', 'calls');

            var vin = $("<td>");
            vin.attr('id', 'vin');
            var vinLink = $("<a>");
            vinLink.attr('href', vinQuest + dateSort[i].caseData.vin);
            vinLink.attr('target', 'target="_blank"');
            vinLink.attr('title', 'vinQuest Information for ' + dateSort[i].caseData.vin);
            vinLink.text(dateSort[i].caseData.vin);
            vin.append(vinLink);

            var year = $("<td>").append(dateSort[i].caseData.year);
            year.attr('id', 'year');

            var model = $("<td>").append(dateSort[i].caseData.model);
            model.attr('id', 'model');

            var miles = $("<td>").append(dateSort[i].caseData.miles);
            miles.attr('id', 'miles');

            var opened = $("<td>");
            opened.attr('id', 'opened');
            var openDateRaw = new Date(dateSort[i].caseData.opened),
                yr = openDateRaw.getFullYear(),
                month = openDateRaw.getMonth() + 1,
                day = openDateRaw.getDate(),
                openDate = month + '-' + day + '-' + yr;
            opened.append(openDate);

            var lastContact = $("<td>");
            lastContact.attr('id', 'last');
            var lastDateRaw = new Date(dateSort[i].caseData.lastContact),
                yr = lastDateRaw.getFullYear(),
                month = lastDateRaw.getMonth() + 1,
                day = lastDateRaw.getDate(),
                lastDate = month + '-' + day + '-' + yr;
            lastContact.append(lastDate);

            var status = $("<td>").append(dateSort[i].caseData.caseStatus);
            status.attr('id', 'status');

            //append data to table
            row.append(select,
                caseNum,
                htssCase,
                fseName,
                dealerCode,
                visits,
                calls,
                vin,
                year,
                model,
                miles,
                opened,
                lastContact,
                status);

            $("#tlData").append(row);

        }

        // function windowOpen(url) {
        //     window.open(url, '_blank',
        //         'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,top=250px, left=500px,width=800,height=600')
        //     return false;
        // }

        // dateSort.length = 0;

    }

    function caseSaveFunct() {
        // console.log('ran');
        // console.log('caseSave', dateSort);

        let caseSave = [];
        // let getData = [];

        $('#saveCase').click(function() {
            event.preventDefault();

            $('#tlData').find('input[name="caseSelect"]:checked').each(function() {
                var save = this.value;
                // console.log(dateSort[save]);
                getData = dateSort[save];
                caseSave.push(dateSort[save]);
                $(this).closest('tr').hide();
            });
            if (caseSave.length <= 0) {
                alert('Please select a case/s to save')
                return;
            } else if (caseSave.length > 0) {
                // console.log('caseSave ', caseSave);
                //alert('Case data has been saved!');
                getData = [];
            }
            saveDataPush(caseSave);
            caseSave = [];
        });

    }
}

function saveDataPush(caseSave) {
    // console.log('in saveDataPush ', caseSave);

    for (let i = 0; i < caseSave.length; i++) {

        $.post("dataPush.php", {

            fseId: caseSave[i].fseData.fseId,
            fse: caseSave[i].fseData.fse,
            caseNum: caseSave[i].caseData.caseNum,
            htssCase: caseSave[i].caseData.htssCaseNum,
            dealerCode: caseSave[i].caseData.dealer,
            vin: caseSave[i].caseData.vin,
            year: caseSave[i].caseData.year,
            model: caseSave[i].caseData.model,
            miles: caseSave[i].caseData.miles,
            visits: caseSave[i].caseData.visits,
            lastContact: caseSave[i].caseData.lastContact

        }, function(data) {
            // console.log(data);
            //alert(data);
            // $('#form')[0].reset(); // To reset form fields
            return;
        });
    }
    pageToggle()
    caseSave = [];
}



// saved case table
function caseSaveTable() {

    fseSaved = [];

    // console.log('before table ', fseSaved);


    $.ajax({
        url: 'saveCase.php',
        type: 'get',
        dataType: 'JSON',
        success: function(savedJson) {
            // console.log('AJAX call was successful!');
            // console.log('Data from the server', savedJson);
            // console.log('fse: ', cat);

            fseSaved = savedJson.filter(function(savedJson) {
                return savedJson.fseId === cat;
            });

            // console.log('after filter in table ', fseSaved);

            $("#scData").empty();

            cases = fseSaved.length;

            // console.log('cases ', cases);

            $("#saveCases").empty();
            $("#saveCases").append(cases);

            if (cases > 0) {
                $("#deleteCase").show();
                $("#saveNote").show();
            } else {
                $("#deleteCase").hide();
                $("#saveNote").hide();
            }

            var techViewer = "http://10.112.5.10/vinoogle/techviewer.php?caseNum=";
            var eReport = "https://gds.hyundaitechinfo.com:447/eReport/diaglist.aspx?&uid="
            var vinQuest = "http://10.112.5.10/vinoogle/_vinoogle.php?vinnum="

            for (let i = 0; i < fseSaved.length; i++) {

                // console.log(caseSaveJson[i]);

                var row = $("<tr>");
                row.attr('class', 'dataRow');

                var select = $("<th>");
                select.attr('scope', 'row');
                select.attr('title', 'select to delete case');
                select.html("<input type='checkbox' value='" + [i] + "' id='dataSelect' name='caseDelete' class='selected'>");

                var caseNum = $("<td>");
                caseNum.attr('id', 'caseNum');
                caseNum.attr('name', 'info');
                var caseLink = $("<a>");
                caseLink.attr('href', techViewer + fseSaved[i].caseNum);
                caseLink.attr('target', 'target="_blank"');
                caseLink.attr('title', 'click to see techline data');
                caseLink.html('<p id="data1">' + fseSaved[i].caseNum);
                caseNum.append(caseLink);

                var dealerCode = $("<td>");
                dealerCode.attr('id', 'dCode');
                dealerCode.attr('name', 'info');
                var eRepLink = $("<a>");
                eRepLink.attr('href', eReport + fseSaved[i].dealer + "GDS&cpcode=B28AA" + fseSaved[i].dealer + "&vin=" + fseSaved[i].vin + "&device=GDSM");
                eRepLink.attr('target', 'target="window()"');
                eRepLink.attr('title', fseSaved[i].dealer + ' eReport Information');
                eRepLink.text(fseSaved[i].dealer);
                dealerCode.append(eRepLink);

                var vin = $("<td>");
                vin.attr('id', 'vin');
                var vinLink = $("<a>");
                vinLink.attr('href', vinQuest + fseSaved[i].vin);
                vinLink.attr('target', 'target="_blank"');
                vinLink.attr('title', 'vinQuest Information for ' + fseSaved[i].vin);
                vinLink.text(fseSaved[i].vin);
                vin.append(vinLink);

                var visit = $("<td>").append(fseSaved[i].visits);

                var noteIn = $("<td>");
                var dateChange = moment(fseSaved[i].updated).format('MMMM Do YYYY, h:mm:ss a');
                noteIn.attr('title', "Note Updated Last: " + dateChange)
                noteIn.append(fseSaved[i].note);


                // console.log(fseSaved[i].updated);


                var NoteSelect = $("<td>");
                NoteSelect.attr('scope', 'row');
                NoteSelect.attr('title', 'select to delete case');
                NoteSelect.html("<input type='checkbox' value='" + [i] + "' id='noteSelect' name='caseSave' class='selected'>");

                var noteOut = $("<td>");
                noteOut.attr('class', 'note');
                var text = $('<textarea rows="2"cols="30">');
                text.attr('name', 'noteOut')
                text.attr('id', 'noteArea')
                noteOut.append(text);

                row.append(select,
                    caseNum,
                    dealerCode,
                    vin,
                    visit,
                    noteIn,
                    NoteSelect,
                    noteOut
                );

                $("#scData").append(row);


            }
            // fseSave = [];


        },
        error: function(req, err) {
            alert('No saved cases, or there was an error performing the AJAX call! ' + err);
        }
    });

}



function caseDeleteFunct(fseSaved) {
    // console.log('ran');

    // console.log('caseDelete function, after table ', fseSaved);

    var caseDel = [];


    // console.log('after [] ', caseDel);

    $('#deleteCase').unbind().click(function() {
        event.preventDefault();

        // console.log('del clicked');


        $('#scData').find('input[name="caseDelete"]:checked').each(function() {
            var del = this.value;
            // console.log(del);
            // console.log(fseSaved[del]);
            // getData = fseSaved[del];
            caseDel.push(fseSaved[del]);
            // $(this).closest('tr').hide();
        });
        if (caseDel.length <= 0) {
            alert('Please select a case/s to delete')
            return;
        } else if (caseDel.length > 0) {
            // console.log('after delete btn ', caseDel);
            delDataPush();
            getData = [];
        }
    });

}


function delDataPush() {

    console.log('in delDataPush', fseSaved);
    // console.log('before post caseDel', caseDel);
    for (let i = 0; i < fseSaved.length; i++) {

        $.post("deleteCase.php", {
            caseNum: fseSaved[i].caseNum,
        }, function(data) {
            // console.log('after post caseDel', caseDel);
            // console.log('after post ', fseSaved);
        });
        savedCaseGet();
        // alert(data);
    }
}


function noteSave() {

    var notePush = [];
    // var noteText;
    $('#saveNote').click(function(e) {
        e.preventDefault();

        var trs = $('table tr');
        var values = trs.first().find('td');

        // var caseNumber = $('table tr td :checkbox:checked').map(function() {
        var caseNumber = $('input[name="caseSave"]:checked').map(function() {
            return $(this).closest('tr').find('td:first').text()

        }).get();

        // var noteText = $('table tr td :checkbox:checked').map(function() {
        var noteText = $('input[name="caseSave"]:checked').map(function() {
            return $(this).closest('tr').find("textarea[name='noteOut']").val()

        }).get();

        notePush.push({ caseNum: caseNumber, note: noteText });
        // console.log(notePush);

        if (notePush.length <= 0) {
            alert('Please select a note')
            return;
        } else if (notePush.length > 0) {
            // // console.log('caseSave ', caseSave);
            // delDataPush(caseDel);
            // alert('Note is...');

            $.post("noteSave.php", {

                caseNum: notePush[0].caseNum[0],
                note: notePush[0].note[0]

            }, function(data) {
                // console.log(data);
                // alert(data);
                // savedCaseGet();
                caseSaveTable();
                return false;
            });

        }

        notePush = [];
    });

    // });
}
// }