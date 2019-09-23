var dealerCode;
var fseLocInput;
var mapZoom;
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
        // console.log('Data from the server', fseData);
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
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: mapZoomInt,
        center: fseLoc,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: true,
        fullscreenControl: true

    });

    // console.log(mapZoomInt); 

    // marker lat / lng by zip
    var dealerPlotRaw = [];
    var dealerPinRaw = [];
    var dealerLoc = [];

    for (var i = 0; i < results.length; i++) {
        if (results[i].fseData.fseId === cat) {
            dealerPlotRaw.push(zip = results[i].dealerData.dealerZip);
            dealerPinRaw.push({ zipcode: results[i].dealerData.dealerZip });
            dealerLoc.push({
                caseNum: results[i].caseData.caseNum,
                concern: results[i].caseData.concern,
                vin: results[i].caseData.vin,
                dealer: results[i].caseData.dealer,
                lat: results[i].dealerData.dealerLat,
                lng: results[i].dealerData.dealerLng
            });
        }
    }

    // marker location object
    var markerGroup = [];

    $("#dsearch").on('click', function() {

        dealerCode = $("#dealerCode").val().trim();
        visitAmt = $("#visitAmt").val().trim();
        callAmt = $("#callAmt").val().trim();
        strtDte = $("#strtDte").val().trim();
        endDte = $("#endDte").val().trim();

        // console.log('Start Date: ', strtDte);
        // console.log('End Date: ', endDte);

        if (dealerCode === 'all' && visitAmt === '1' && callAmt === '%') {
            for (let i = 0; i < dealerLoc.length; i++) {

                var markerDealer = dealerLoc[i].dealer;
                var markerVin = dealerLoc[i].vin;
                var markerConcern = dealerLoc[i].concern;

                localLat = parseFloat(dealerLoc[i].lat);
                localLng = parseFloat(dealerLoc[i].lng);

                // console.log(localLat);
                // console.log(localLng);

                dealer = markerDealer;
                vin = markerVin;
                concern = markerConcern;

                markerGroup.push({ lat: localLat, lng: localLng });

            }
            mapReload();
        }


    });

    function mapReload() {

        // console.log("In initMap: " + localLat);
        // console.log("In initMap: " + localLng);

        //marker location placement
        // var eventMarker = {
        //     lat: localLat,
        //     lng: localLng,
        // };

        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // //marker popup data display
        // var contentString = '<div id=popUp>' +
        //     '<div id="dlr">Dealer: ' + dealer + '</div>' +
        //     '<div id="vin">VIN: ' + vin + '</div>' +
        //     '<div id="concern">Concern: ' + concern + '</div>';

        // //marker popup window command
        // var infowindow = new google.maps.InfoWindow({
        //     content: contentString
        // });

        //marker popup creation / placement (from ticketmaster api data population)
        // var marker = new google.maps.Marker({
        //     position: eventMarker,
        //     map: map
        // });

        var markers = markerGroup.map(function(location, i) {
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length]
            });
        });



        console.log(markerGroup);
        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

        //click listener to populate the marker information popup
        // google.maps.event.addListener(markers, 'click', function() {
        //     if (!markers.open) {
        //         infowindow.open(map, markers);
        //         markers.open = true;
        //     } else {
        //         infowindow.close();
        //         markers.open = false;
        //     }
        //     google.maps.event.addListener(map, 'click', function() {
        //         infowindow.close();
        //         markers.open = false;
        //     });
        // });

    }

























}