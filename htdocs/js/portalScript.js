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
        zoomControl: true,
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
                lng: results[i].dealerData.dealerLng,
                date: results[i].caseData.lastContact,
                fseLoc: fseLoc,
                mapZoomInt: mapZoomInt

            });
        }
    }
    // marker location object

    var markerGroup = [];

    $("#dsearch").on('click', function() {

        var dataSort = [];

        dealerCode = $("#dealerCode").val().trim();
        visitAmt = $("#visitAmt").val().trim();
        callAmt = $("#callAmt").val().trim();

        var startDate = new Date($("#strtDte").val().trim());
        var endDate = new Date($("#endDte").val().trim());

        var filteredData = dateFilterer(dealerLoc, startDate, endDate);

        dateSort = filteredData.finalValues

        // console.log(dateSort);

        if (dealerCode === 'all' && visitAmt === '1' && callAmt === '%') {
            for (let i = 0; i < dateSort.length; i++) {

                var markerDealer = dateSort[i].dealer;
                var markerVin = dateSort[i].vin;
                var markerConcern = dateSort[i].concern;

                localLat = parseFloat(dateSort[i].lat);
                localLng = parseFloat(dateSort[i].lng);

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

    // date filter
    function dateFilterer(sourceValues, startDate, endDate) {

        function filterFunction_dates(sourceValue) {

            //Aim: To test if the tested date is valid within a particular range
            var rangeAcceptance = {
                minValid: new Date(sourceValue.date) >= new Date(startDate),
                maxValid: new Date(sourceValue.date) <= new Date(endDate)
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

        /*console.log({
      
          originalValues: sourceValues,
          finalValues: sourceValues.filter(filterFunction_dates),
          "time of filter": new Date()
      
        });*/

        //Return the data for display
        return ({

            originalValues: sourceValues,
            finalValues: sourceValues.filter(filterFunction_dates)

        });

    }

    function mapReload() {

        // console.log(markerGroup);
        var markers = markerGroup.map(function(location, i) {
            return new google.maps.Marker({
                position: location,
                // label: labels[i % labels.length]
            });
        });


        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

        markerGroup = [];
        $("#dsearch").on('click', function() {
            markerCluster.removeMarkers(markers);
        });
    }

}