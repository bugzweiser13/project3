// var dealerCode;
// var fseLocInput;
// var mapZoom;
var map
var caseLookup = [];
var dealerMark = [];
var geoKey = "fCURbHxAzoqUZmVp1Hk2QPlHRB1ErPlN";


var cat = $("#cat").val().trim();
var fseName = $("#fseNameTrig").val().trim();

// db ajax get / call
$.ajax({
    url: 'fseData.php',
    type: 'get',
    dataType: 'JSON',
    success: function(fseData) {
        // console.log('AJAX call was successful!');
        console.log('Data from the server', fseData);
        dataPopulate(fseData);
    },
    error: function(req, err) {
        alert('There was some error performing the AJAX call! ' + err);
    }
});

function reload(form) {
    var val = cat
    self.location = 'portal.php?cat=' + val;
}

function rotateBack() {
    var boxType = $('#tsb').attr('class');
    if (boxType == "camp_tsb") $('#tsb').attr('class', 'camp_camp');
    if (boxType == "camp_camp") $('#tsb').attr('class', 'camp_tsb');
    setTimeout(rotateBack, 2500);
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
    // var dealer;
    var dealer = [];
    var dateSort = [];
    var dealerLoc = [];
    $("#dsearch").on('click', function() {

        // console.log("results in button funct: ", results);
        dealerLoc = [];
        dateSort = [];
        dealer = [];

        $("#tlData").empty();

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

        // console.log('after dealer ', dealerLoc);


        // console.log(visitAmt);

        var visitSel = [];

        for (var i = 0; i < results.length; i++) {
            if (visitAmt === '1') {
                visitSel.push(results[i]);
            } else if (results[i].caseData.visits === visitAmt) {
                console.log(results[i].caseData.visits);
                visitSel.push(results[i]);
            }
        };

        // console.log('visits: ', visitSel);

        // console.log(callAmt);

        var finalSort = [];

        for (var i = 0; i < visitSel.length; i++) {
            if (callAmt === '%') {
                finalSort.push(visitSel[i]);
            } else if (visitSel[i].caseData.callCount === callAmt) {
                finalSort.push(visitSel[i]);
            }
        }

        // console.log('final sort: ', finalSort);

        var filteredData = dateFilterer(finalSort, startDate, endDate);

        dateSort = filteredData.finalValues

        console.log('date sort', dateSort);

        if (dealerCode === 'all') {
            for (let i = 0; i < dateSort.length; i++) {

                // var markerDealer = dateSort[i].dealerData.dealer;
                // var markerVin = dateSort[i].dealerData.vin;
                // var markerConcern = dateSort[i].caseData.concern;

                localLat = parseFloat(dateSort[i].dealerData.dealerLat);
                localLng = parseFloat(dateSort[i].dealerData.dealerLng);

                // console.log(localLat);
                // console.log(localLng);

                // dealer = markerDealer;
                // vin = markerVin;
                // concern = markerConcern;

                markerGroup.push({ lat: localLat, lng: localLng });

            }
            dealerClusterMap();
            dataTable();
        } else {

            // dealer = [];

            // console.log(dealerCode);
            // console.log('else', dateSort);
            // console.log('final in else', finalSort);

            // console.log(results);


            // console.log('dealer length: ', dealer.length);
            // console.log('dateSort in else: ', dateSort);


            for (var i = 0; i < dateSort.length; i++) {
                if (dateSort[i].caseData.dealer === dealerCode) {
                    // console.log('inside if ', dateSort[i].caseData.dealer);
                    dealer.push(dateSort[i]);
                    console.log('did this run?');

                } else if (dateSort[i].caseData.dealer === null) {
                    // console.log(dealerLoc);
                    console.log('or what it this?');
                    // var warning = $('<tr>');
                    // var warnData = $('<td>');
                    // warnData.attr('colspan', '14');
                    // warnData.attr('id', 'noCase');
                    // warnData.text('No Records / Data Found (or search fields blank).');
                    // warning.append(warnData);
                    // $("#tlData").append(warning);
                    // break

                }
            }
            // console.log('before greater ', dealer);

            // console.log('dateSort length ', dateSort.length > 0);

            if (dealer.length > 0) {

                console.log('greater dateSort', dateSort);
                console.log('greater dealer', dealer);


                // localLat = parseFloat(dealer[0].dealerData.dealerLat);
                // localLng = parseFloat(dealer[0].dealerData.dealerLng);

                // markerGroup.push({
                //     lat: localLat,
                //     lng: localLng,
                //     dealer: dateSort[0].caseData.dealer,
                //     dealerName: dateSort[0].dealerData.dealerName
                // });

                console.log(markerGroup);


                // console.log('dealer in greater ', dealer);

                dateSort = dealer;

                // console.log('dateSort in greater ', dateSort);

                oneDealerMap();
                dataTable();
            } else {
                console.log('no dealer');
                console.log('in else ', dealerLoc);

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

        // console.log(markerGroup);
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var bounds = new google.maps.LatLngBounds();
        var markers = markerGroup.map(function(location, i) {
            bounds.extend(location);
            map.fitBounds(bounds);
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
            });
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
            // '<div id="showDte">Show Date: ' + showPop + '</div>' +
            // '<div id="saleDte">On Sale: ' + salePop + '</div>' +
            // '<div id="tickets">Tickets: ' + tktPop + '</div>' +
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

    function dataTable() {
        $("#tlData").empty();
        // console.log('run');

        console.log('Incoming dateSort ', dateSort);

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
            select.html("<input type='checkbox' value='" + [i] + "' id='dataSelect' name='case'>");

            var caseNum = $("<td>");
            var caseLink = $("<a>");
            caseLink.attr('href', techViewer + dateSort[i].caseData.caseNum);
            caseLink.attr('target', 'target="_blank"')
            caseLink.attr('title', dateSort[i].caseData.concern + " Dealer Technician: " + dateSort[i].caseData.technician);
            caseLink.text(dateSort[i].caseData.caseNum);
            caseNum.append(caseLink);

            var htssCase = $("<td>");
            var htssLink = $("<a>");
            htssLink.attr('href', htssLogin);
            htssLink.attr('target', 'target="_blank"');
            htssLink.attr('title', 'HTSS Connect Login');
            htssLink.text(dateSort[i].caseData.htssCaseNum);
            htssCase.append(htssLink);

            var fseName = $("<td>").append(dateSort[i].fseData.fse);

            var dealerCode = $("<td>");
            var eRepLink = $("<a>");
            eRepLink.attr('href', eReport + dateSort[i].caseData.dealer + "GDS&cpcode=B28AA" + dateSort[i].caseData.dealer + "&vin=" + dateSort[i].caseData.vin + "&device=GDSM");
            eRepLink.attr('target', 'target="window()"');
            eRepLink.attr('title', 'eReport Information');
            eRepLink.text(dateSort[i].caseData.dealer);
            dealerCode.append(eRepLink);

            var visits = $("<td>").append(dateSort[i].caseData.visits);
            var calls = $("<td>").append(dateSort[i].caseData.callCount);

            var vin = $("<td>");
            var vinLink = $("<a>");
            vinLink.attr('href', vinQuest + dateSort[i].caseData.vin);
            vinLink.attr('target', 'target="_blank"');
            vinLink.attr('title', 'eReport Information');
            vinLink.text(dateSort[i].caseData.vin);
            vin.append(vinLink);

            var year = $("<td>").append(dateSort[i].caseData.year);
            var model = $("<td>").append(dateSort[i].caseData.model);
            var miles = $("<td>").append(dateSort[i].caseData.miles);

            var opened = $("<td>");
            var openDateRaw = new Date(dateSort[i].caseData.opened),
                yr = openDateRaw.getFullYear(),
                month = openDateRaw.getMonth(),
                day = openDateRaw.getDate(),
                openDate = month + '-' + day + '-' + yr;
            opened.append(openDate);

            var lastContact = $("<td>");
            var lastDateRaw = new Date(dateSort[i].caseData.lastContact),
                yr = lastDateRaw.getFullYear(),
                month = lastDateRaw.getMonth(),
                day = lastDateRaw.getDate(),
                lastDate = month + '-' + day + '-' + yr;
            lastContact.append(lastDate);

            var status = $("<td>").append(dateSort[i].caseData.caseStatus);

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

        function windowOpen(url) {
            window.open(url, '_blank',
                'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,top=250px, left=500px,width=800,height=600')
            return false;
        }

        dateSort.length = 0;

    }
}