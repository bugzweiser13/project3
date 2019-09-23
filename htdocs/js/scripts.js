// scripts for the new type page. I am trying to keep everything seperated, scripts,
// styles etc so hopefully it will make it easier to fix, add to etc.
//new page transfer with new web page
var xmlhttp

function set_tsb() {
    document.getElementById('tsb').value = "";
    document.getElementById('tsb').style.fontStyle = 'normal';
    document.getElementById('tsb').style.color = 'black';
}

//vinQuest
function set_vin() {
    document.getElementById('vin').value = "";
    document.getElementById('vin').style.fontStyle = 'normal';
    document.getElementById('vin').style.color = 'black';
}

//eReport (hyundai)
function set_erHvin() {
    document.getElementById('erHvin').value = "";
    document.getElementById('erHvin').style.fontStyle = 'normal';
    document.getElementById('erHvin').style.color = 'black';
}

//eReport (genesis)
function set_erGvin() {
    document.getElementById('erGvin').value = "";
    document.getElementById('erGvin').style.fontStyle = 'normal';
    document.getElementById('erGvin').style.color = 'black';
}

function performSearch() {
    if (document.getElementById("tsb") && document.getElementById("tsb").value != "") {
        var y = document.getElementById("tsb").value.replace(/ /g, "");
        y = y.toUpperCase();
        document.getElementById("tsb").value = "";
        $('#tsb').attr('class', 'camp_no_focus');
        checkTSB(y);
    }

    //vinQuest
    if (document.getElementById("vin") && document.getElementById("vin").value != "") {
        var c = document.getElementById("vin").value.toUpperCase();
        document.getElementById("vin").value = c;
        //  if(document.getElementById("vin").value.indexOf(" ",0)>=0 || document.getElementById("vin").value.length<17)
        //   {
        //   jAlert('The VIN Number Entered Is Not A Valid VIN', 'Incorrect Data');
        //   return;
        //   }
        var vin = document.getElementById("vin").value;
        document.getElementById("vin").value = "";
        setTimeout("document.getElementById('sb').focus()", 10);
        $('#vin').attr('class', 'vin_no_focus');
        var url = "http://10.112.5.10/vinoogle/_vinoogle.php?vinnum=" + vin;
        // window.open(url,"_blank","toolbar=no, location=no, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes");
        // window.open(url, "_blank", "toolbar=yes, location=yes, directories=yes, status=yes, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes");
        windowOpen(url);

    }

    //eReport vin search (hyundai)
    if (document.getElementById("erHvin") && document.getElementById("erHvin").value != "") {
        var c = document.getElementById("erHvin").value.toUpperCase();
        document.getElementById("erHvin").value = c;
        var vin = document.getElementById("erHvin").value;
        document.getElementById("erHvin").value = "";
        setTimeout("document.getElementById('sb').focus()", 10);
        $('#erHvin').attr('class', 'erH_no_focus');
        var url = "https://gds.hyundaitechinfo.com:447/eReport/diaglist.aspx?&cpcode=B28AA&vin=" + vin + "&device=GDSM";
        // window.open(url,"_blank","toolbar=no, location=no, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes");
        // window.open(url, "_blank", "toolbar=yes, location=yes, directories=yes, status=yes, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes");
        windowOpen(url);

    }

    //eReport vin search (genesis)
    if (document.getElementById("erGvin") && document.getElementById("erGvin").value != "") {
        var c = document.getElementById("erGvin").value.toUpperCase();
        document.getElementById("erGvin").value = c;
        var vin = document.getElementById("erGvin").value;
        document.getElementById("erGvin").value = "";
        setTimeout("document.getElementById('sb').focus()", 10);
        $('#erGvin').attr('class', 'erG_no_focus');
        var url = "https://gds.genesistechinfo.com/ereport/diaglist.aspx?uid=GDS&cpcodeB28AA&vin=" + vin + "&device=GDSM";
        // window.open(url,"_blank","toolbar=no, location=no, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes");
        // window.open(url, "_blank", "toolbar=yes, location=yes, directories=yes, status=yes, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes");
        windowOpen(url);

    }
}

//window popUp function
function windowOpen(url) {
    window.open(url, '_blank',
        'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,top=125px, left=500px,width=800,height=350')
    return false;
}

function whichButton(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode == "13") {
        var box = document.activeElement;
        if (box.value == "") return;
        switch (box.id) {
            case "tsb":
                var y = box.value.replace(/ /g, "");
                hasDash = y.indexOf("-");
                if (!hasDash) {
                    var str = y.length;
                    if (str == 7) {
                        first = y.slice(0, 2);
                        second = y.slice(2, 4);
                        third = y.slice(4, 7);
                        y = first + "-" + second + "-" + third;
                    }
                    if (str >= 8) {
                        first = y.slice(0, 2);
                        second = y.slice(2, 4);
                        third = y.slice(4, 7);
                        tsbLen = y.length;
                        fourth = y.slice(7, tsbLen);
                        y = first + "-" + second + "-" + third + "-" + fourth;
                    }
                }
                y = y.toUpperCase();
                box.value = "";
                box.blur();
                checkTSB(y);
                break;
                //vinQuest
            case "vin":
                var c = box.value.toUpperCase();
                box.value = c;
                //        if(c.indexOf(" ",0)>=0 || box.value.length<17)
                //        {
                //	      jAlert('The VIN Number Entered Is Not A Valid VIN', 'Incorrect Data');
                //	      return;
                //	      }
                var vin = box.value;
                box.value = "";
                //setTimeout("document.getElementById('info_bar').focus()", 10);
                //setTimeout("$('#vin').attr('class','vin_no_focus')", 10);
                //var url="common/support/vin.php?vin="+vin;
                var url = "http://10.112.5.10/vinoogle/_vinoogle.php?vinnum=" + vin;
                window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes");
                break;
                //eReport (hyundai)        
            case "erHvin":
                var c = box.value.toUpperCase();
                box.value = c;
                var erHvin = box.value;
                box.value = "";
                var url = "https://gds.hyundaitechinfo.com:447/eReport/diaglist.aspx?&cpcode=B28AA&vin=" + erHvin; + "&device=GDSM";
                window.open(url, "_blank", "toolbar=yes, location=no, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes");
                break;
                //eReport (genesis)        
            case "erGvin":
                var c = box.value.toUpperCase();
                box.value = c;
                var erGvin = box.value;
                box.value = "";
                var url = "https://gds.genesistechinfo.com/ereport/diaglist.aspx?uid=GDS&cpcodeB28AA&vin=" + erGvin + "&device=GDSM";
                window.open(url, "_blank", "toolbar=yes, location=no, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes");
                break;
            case "dcode":
            case "areacode":
            case "state":
            case "zip":
                get_data();
                break;
            case "arco_box":
                getAcro(box.value);
                break;
            case "dtc_box":
                do_code(box.value);
                break;
            case "dtcd_box":
                get_def(box.value);
                break;
            case "etmnum":
                get_etm();
                break;
            case "Fxmodel":
            case "year":
            case "symptom":
            case "code":
                m_data();
                break;
        }
    }
}

function reset_tsb() {
    document.getElementById('tsb').value = "Enter TSB Number";
    document.getElementById('tsb').style.fontStyle = 'italic';
    document.getElementById('tsb').style.color = '#A6A6A6';
}

function reset_vin() {
    document.getElementById('vin').value = "Enter VIN Number";
    document.getElementById('vin').style.fontStyle = 'italic';
    document.getElementById('vin').style.color = '#A6A6A6';
}

function upperCase(x) {
    var y = document.getElementById(x).value;
    document.getElementById(x).value = y.toUpperCase();
}

function show_link(address) {
    //window.open(address,"_blank","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=yes, height=600, width=1000");
    document.getElementById("waiting").style.display = "inline";
    xmlhttp = GetXmlHttpObject();
    address = encodeURI(address);
    xmlhttp.onreadystatechange = stateChangLink;
    xmlhttp.open("GET", address, true);
    xmlhttp.send(null);
}

function stateChangLink() {
    if (xmlhttp.readyState == 4) {
        var stop = xmlhttp.responseText.indexOf("NeedLogIn", 0);
        if (stop > 0) {
            jAlert('You Do Not Have Access to This Page', 'Access Violation');
            return;
        }
        var stop = xmlhttp.responseText.indexOf("<showbMessage>", 0);
        if (stop > 0) {
            $.alerts.dialogClass = 'info';
            jAlert('Bluelink Has Multiple Names for Several Models. Make Sure You Select All Models Listed for the Model You are Requesting', 'Information');
            $.alerts.dialogClass = null;
        }
        document.getElementById("data-results").innerHTML = xmlhttp.responseText;
        if (document.getElementById("model")) getyear();
        //  if (document.getElementById("bmodel"))  getLinkyear();
        document.getElementById("waiting").style.display = "none";
        document.getElementById("data").style.position = "absolute";
        document.getElementById("data").style.display = "inline";
        document.getElementById("cBox").style.position = "relative";
        document.getElementById("cBox").style.display = "inline";
        //if (document.getElementById("3Dselection")) get3dReport('default');
    }
}
//here
function GetXmlHttpObject() {
    return window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
}

function updateDOM(inputField) {
    // if the inputField ID string has been passed in, get the inputField object
    if (typeof inputField == "string") {
        inputField = document.getElementById(inputField);
    }

    if (inputField.type == "select-one") {
        for (var i = 0; i < inputField.options.length; i++) {
            if (i == inputField.selectedIndex) {
                inputField.options[inputField.selectedIndex].setAttribute("selected", "selected");
            }
        }
    } else if (inputField.type == "select-multiple") {
        for (var i = 0; i < inputField.options.length; i++) {
            if (inputField.options[i].selected) {
                inputField.options[i].setAttribute("selected", "selected");
            } else {
                inputField.options[i].removeAttribute("selected");
            }
        }
    } else if (inputField.type == "text") {
        inputField.setAttribute("value", inputField.value);
    } else if (inputField.type == "textarea") {
        inputField.setAttribute("value", inputField.value);
        inputField.innerHTML = inputField.value;
    } else if (inputField.type == "checkbox") {
        if (inputField.checked) {
            inputField.setAttribute("checked", "checked");
        } else {
            inputField.removeAttribute("checked");
        }
    } else if (inputField.type == "radio") {
        var radioNames = document.getElementsByName(inputField.name);
        for (var i = 0; i < radioNames.length; i++) {
            if (radioNames[i].checked) {
                radioNames[i].setAttribute("checked", "checked");
            } else {
                radioNames[i].removeAttribute("checked");
            }
        }
    }
}

function showback(id) {
    var e = document.getElementsByName(id);
    for (var i = 0; i < e.length; i++) {
        e[i].setAttribute('class', 'highlight');
        e[i].setAttribute('className', 'highlight');
    }
}

function removeback(id) {
    var e = document.getElementsByName(id);
    for (var i = 0; i < e.length; i++) {
        e[i].setAttribute('className', 'standard');
        e[i].setAttribute('class', 'standard');
    }
}

function showCal() {
    var divlb = document.getElementById("logbox");
    var caldiv = document.createElement('div');
    caldiv.setAttribute('id', 'cdate');
    divlb.appendChild(caldiv);
    Calendar.setup({
        flat: "cdate", // id of the input field
        weekNumbers: false
    });
    document.getElementById("logbox").style.position = "absolute";
    document.getElementById("logbox").style.display = "inline";
    document.getElementById("showBox").style.display = "none";
    $('#logbox').center(true);
}

function closeLogbox() {
    var xx = document.getElementById("cdate");
    if (xx) {
        var oDiv = document.getElementById("logbox");
        oDiv.removeChild(xx);
    }
    document.getElementById('logbox').style.display = 'none';
    if (document.getElementById("showBox").style.display != "none") document.getElementById("showBox").style.display = "none";
}

function selText(id) {
    document.getElementById(id).select();
}

function DatePicker(me) {
    Calendar.setup({
        inputField: me, // id of the input field
        ifFormat: "%m/%d/%Y", // format of the input field
        singleClick: true,
        weekNumbers: false
    });
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function checkTSB(loc) {
    loc = loc.toUpperCase()
    var url = "http://10.112.5.10/common/scripts/_fileExist.php?location=/documents/tsbs&tsb=" + loc;
    oHttp = GetXmlHttpObject();
    oHttp.onreadystatechange = showTSB;
    oHttp.open("GET", url, true);
    oHttp.send(null);
}

function showTSB() {
    if (oHttp.readyState == 4) {
        // alert(oHttp.responseText);
        var start = oHttp.responseText.indexOf("<filegood>", 0);
        if (start > 0) {
            start = start + 10;
            var stop = oHttp.responseText.indexOf("</filegood>", start);
            var url = oHttp.responseText.substr(start, (stop - start));
            //  alert(url);
            //   window.open(url,"_blank");
            window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=yes");
        } else {
            start = oHttp.responseText.indexOf("<filebad>", 0);
            start = start + 9;
            var stop = oHttp.responseText.indexOf("</filebad>", start);
            var tsb = oHttp.responseText.substr(start, (stop - start));
            checkTSBlocal(tsb);
        }
    }
}

function checkTSBlocal(loc) {
    var url = "http://10.112.5.10/common/scripts/_fileExist.php?location=/documents/tsbs&tsb=" + loc;
    oHttp = GetXmlHttpObject();
    oHttp.onreadystatechange = showTSBlocal;
    oHttp.open("GET", url, true);
    oHttp.send(null);
}

function showTSBlocal() {
    if (oHttp.readyState == 4) {
        var start = oHttp.responseText.indexOf("<filegood>", 0);
        if (start > 0) {
            start = start + 12;
            var stop = oHttp.responseText.indexOf("</filegood>", start);
            var url = "common" + oHttp.responseText.substr(start, (stop - start));
            window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=yes");
        } else //if (start==0)
        {
            start = oHttp.responseText.indexOf("<filebad>", 0);
            if (start > 0) {
                start = start + 9;
                var stop = oHttp.responseText.indexOf("</filebad>", start);
                var tsb = oHttp.responseText.substr(start, (stop - start));
                $.alerts.dialogClass = 'info'; // set custom style class
                jAlert('The TSB,&nbsp;<b><i>' + tsb + '</i></b>,&nbsp;&nbsp;Was Not Found on This Server.<br />Try Searching HMA Service.', 'Information', function() {
                    $.alerts.dialogClass = null; // reset to default
                });
            }
        }
    }
}

function pageChanged() {
    if (xmlhttp.readyState == 4) {
        var stop = xmlhttp.responseText.indexOf("NoRecords", 0);
        if (stop > 1) {
            $.alerts.dialogClass = 'info'; // set custom style class
            jAlert('No Records were Found for Your Selection', 'No Records', function() {
                $.alerts.dialogClass = null; // reset to default
            });
            return;
        }
        //document.getElementById("pageResults").innerHTML=xmlhttp.responseText;
        document.getElementById("data-results").innerHTML = xmlhttp.responseText;
        document.getElementById("data").style.position = "absolute";
        document.getElementById("data").style.display = "inline";
        document.getElementById("cBox").style.position = "relative";
        document.getElementById("cBox").style.display = "inline";
        var stop = xmlhttp.responseText.indexOf("</minacs>", 0);
        if (stop > 1) {
            document.getElementById("_selection").value = "minacs";
        }
    }
}

function run_slideshow(ss) {
    url = "slideshows/slideshow.php?show=" + ss;
    window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=no, width=1000, height=800");
}


function changeCaseProper(frmObj) {
    var index;
    var tmpStr;
    var tmpChar;
    var preString;
    var postString;
    var strlen;
    tmpStr = frmObj.value.toLowerCase();
    strLen = tmpStr.length;
    if (strLen > 0) {
        for (index = 0; index < strLen; index++) {
            if (index == 0) {
                tmpChar = tmpStr.substring(0, 1).toUpperCase();
                postString = tmpStr.substring(1, strLen);
                tmpStr = tmpChar + postString;
            } else {
                tmpChar = tmpStr.substring(index, index + 1);
                if (tmpChar == " " && index < (strLen - 1)) {
                    tmpChar = tmpStr.substring(index + 1, index + 2).toUpperCase();
                    preString = tmpStr.substring(0, index + 1);
                    postString = tmpStr.substring(index + 2, strLen);
                    tmpStr = preString + tmpChar + postString;
                }
            }
        }
    }
    frmObj.value = tmpStr;
}

function lowerCase(obj) {
    obj.value = obj.value.toLowerCase();
}

function pageResults() {
    if (xmlhttp.readyState == 4) {
        //  alert(xmlhttp.responseText);
        if (document.getElementById("waiting")) document.getElementById("waiting").style.display = "none";
        var stop = xmlhttp.responseText.indexOf("NoRecords", 0);
        if (stop > 1) {
            $.alerts.dialogClass = 'info'; // set custom style class
            jAlert('No Records were Found for Your Selection', 'No Records', function() {
                $.alerts.dialogClass = null; // reset to default
            });
            document.getElementById("page_results").innerHTML = "";
            return;
        }
        document.getElementById("page_results").innerHTML = xmlhttp.responseText;
    }
}

function getReflash() {
    var str = document.getElementById("models").value
    var url = "applications/reflash/scripts/_reflash.php?model=" + str;
    xmlhttp.onreadystatechange = pageResults;
    xmlhttp.open("GET", url, true);
    xmlhttp.send(null);
}

function getSysinfo(x) {
    var str = document.getElementById("Sysmodel").value;
    if (str == "blank") {
        jAlert('You Need to Select A Vehicle First', 'Incorrect Selection');
        return;
    }
    xmlhttp = GetXmlHttpObject();
    url = "applications/hsi/scripts/_systems.php?model=" + str + "&system=" + x;
    xmlhttp.onreadystatechange = pageResults;
    xmlhttp.open("GET", url, true);
    xmlhttp.send(null);
}

function clearHsi() {
    document.getElementById("page_results").innerHTML = "";
}

function showContacts(id) {
    $('#mapBox').mousemove(function(e) {
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        document.getElementById("contactbox").style.top = y + "px";
        document.getElementById("contactbox").style.left = x + "px";
    });
    var url = "common/scripts/_training.php?center=" + id;
    xmlhttp = GetXmlHttpObject();
    xmlhttp.onreadystatechange = trainingResults;
    xmlhttp.open("GET", url, true);
    xmlhttp.send(null);
}

function trainingResults(id) {
    if (xmlhttp.readyState == 4) {
        document.getElementById("contactbox").innerHTML = xmlhttp.responseText;
        document.getElementById("contactbox").style.display = "inline";
    }
}

function clearPop() {
    document.getElementById("contactbox").style.display = "none";
}

function get3dReport(action) {
    //alert(action);
    document.getElementById("waiting").style.display = "inline";
    var veh = document.getElementById("modelList").value;
    var vyear = document.getElementById("modelYear").value;
    var sdate = document.getElementById("startDate").value;
    var edate = document.getElementById("endDate").value;
    var fcode = document.getElementById("codes").value;
    var showc = document.getElementById("show").value;
    var url = "services/3d/_3dreport.php?type=" + action + "&model=" + veh + "&myear=" + vyear + "&dates=" + sdate + "&datee=" + edate + "&code=" + fcode + "&show=" + showc;
    alert(url);
    xmlhttp = GetXmlHttpObject();
    xmlhttp.onreadystatechange = pageResults;
    xmlhttp.open("GET", url, true);
    xmlhttp.send(null);
}

function getModelYear() {
    var xx = document.getElementById("modelList").value;
    var url = "services/3d/_3dyear.php?vmodel=" + xx;
    xmlhttp = GetXmlHttpObject();
    xmlhttp.onreadystatechange = changeYears;
    xmlhttp.open("GET", url, true);
    xmlhttp.send(null);
}

function changeYears() {
    if (xmlhttp.readyState == 4) {
        document.getElementById("yearHolder").innerHTML = xmlhttp.responseText;
    }
}

function getDetails(code, year, model) {
    var sdate = document.getElementById("startDate").value;
    var edate = document.getElementById("endDate").value;
    //  var order=document.getElementById("sorton").value;
    var url = "services/3d/3Ddetail.php?model=" + model + "&myear=" + year + "&dates=" + sdate + "&datee=" + edate + "&dtc=" + code;
    window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=no, width=825, height=475");
}

function get3Ddata() {
    document.getElementById("page_results").innerHTML = "<center><span><img src='../../common/images/loading-gifs/hyundai-wait.gif' width='55' height='54' alt='' border='0'></span></center>";
    var sdate = document.getElementById("startdate").value;
    var edate = document.getElementById("enddate").value;
    var model = document.getElementById("vmodel").value;
    var year = document.getElementById("vyear").value;
    var code = document.getElementById("dtc").value;
    //  var sort=document.getElementById("order").value;
    var url = "_getvins.php?model=" + model + "&myear=" + year + "&dates=" + sdate + "&datee=" + edate + "&dtc=" + code;
    alert(url);
    xmlhttp = GetXmlHttpObject();
    xmlhttp.onreadystatechange = pageResults;
    xmlhttp.open("GET", url, true);
    xmlhttp.send(null);
}

function searchText(txt) {
    if (txt == "") return;
    $('td').removeClass('dpanel');
    $('td:contains("' + txt + '")').addClass('dpanel');
}

function showtDetails(vinNo) {
    var url = "_report.php?vin=" + vinNo;
    window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=no, width=825, height=475");
}

function createNew(mywindow) {
    if (document.getElementById("isLoggedIn").value == "") {
        jAlert("You Need to Be Logged In to Access This Option", "Access Violation");
        return;
    }
    window.open(mywindow, "_blank");
}

function sendMail() {
    $.alerts.dialogClass = "help";
    jPrompt("Send eMail to Dealer and DPSM / FSE", "Enter Dealer Code", "Send eMail to Dealers / DPSM / FSE", function(r) {
        if (r && r != 'Enter Dealer Code') {
            $.alerts.dialogClass = null;
            $.post("services/mail/reports/mdealers.php", { dcode: r },
                function(data) {
                    if (!data.indexOf("mailto")) {
                        //	 window.open(data,"_self");
                        window.location.href = data;
                        return;
                    } else {
                        $.alerts.dialogClass = "info";
                        jAlert(data, "Dealer Not Found");
                        $.alerts.dialogClass = null;
                        //return; 
                    }
                });
        }
    });
}

function ckinv() {
    $.alerts.dialogClass = "help";
    jPrompt("Check a Part Number and Inventory at PDC's", "Enter Part Number", "FAST Part Number Check", function(r) {
        if (r && r != 'Enter Part Number') {
            $.alerts.dialogClass = null;

            document.getElementById("data").style.display = "none";
            document.getElementById("cBox").style.display = "none";
            document.getElementById("waiting").style.position = "absolute";
            document.getElementById("waiting").style.display = "inline";
            xmlhttp = GetXmlHttpObject();
            r = r.replace(/\s/gi, '');
            r = r.replace(/-/gi, '');
            r = r.replace(/\*/gi, '');
            var url = "../common/support/partinv.php?part=" + r;
            xmlhttp.onreadystatechange = stateChangLink;
            xmlhttp.open("GET", url, true);
            xmlhttp.send(null);
        } else {
            return;
        }
        $.alerts.dialogClass = null;
    });
    return;
}

function showReport(report) {
    var url = "services/mail/reports/miscreports.php?type=" + report;
    xmlhttp = GetXmlHttpObject();
    xmlhttp.onreadystatechange = stateShowReport;
    xmlhttp.open("GET", url, true);
    xmlhttp.send(null);
}

function stateShowReport() {
    if (xmlhttp.readyState == 4) {
        closeBoxes();
        document.getElementById("reportbox").innerHTML = xmlhttp.responseText;
        document.getElementById("reportbox").style.position = "absolute";
        document.getElementById("reportbox").style.display = "inline";
        //  $('#reportbox').center(true);
    }
}

function sendtsb() {
    $.alerts.dialogClass = "help";
    jPrompt("Find TSB / Campaign", "Enter TSB / Campaign Number", "TSB / Campaign Search", function(r) {
        if (r && r != 'Enter TSB Number') {
            $.alerts.dialogClass = null;
            checkTSB(r);
        }
    });
}

function showHelp(page) {
    switch (page) {
        case "livemail":
            helptxt = "Select the fields you want to search. You can use all of the options or" +
                " any combination thereof. Then press <b><i>Save</i></b>. Choose between getting <b><i>eMails</i></b> every time a" +
                " case is touched or a <b><i>Subscription</i></b> where a report will be delivered to you everyday with cases" +
                " that were created or updated the previous day. You can update the CC field after the Selection is saved by adding" +
                " email address when viewing your saved searches separating the address  by spaces."
            break;
        case "htssmail":
            helptxt = "Select the fields you want to search. You can use all of the options or any combination thereof. " +
                "Then press <b><i>Save</i></b>. Choose between getting <b><i>eMails</i></b> every time a Vehicle is plugged into a GDS" +
                " with a concern matching criteria you selected or a <b><i>Subscription</i></b> where a report will be delived to you everyday with events that were created the previous day." +
                " You can update the CC field after the Selection is saved by adding email address when viewing your saved searches separating the address  by spaces."
            break;
        case "dtcreport":
            helptxt = "Select the Criteria you want and Submit for a report delivered in Excel format. Use this when you want to know what the filed is seeing as far as DTC's. " +
                "Choose <i>Detailed</i> list DTC's for each vehicle and <i>Summary</i> for the number of DTC's seen as a group" +
                "<br><br><b>NOTE:</b> Some features do not work with Internet Explorer. Try using Firefox, Chrome, or Opera."
            break;
        case "crmsearch":
            helptxt = "Select the fields you want to search. Your search is of the Techline CRM file so you can see what Technician's are calling about and what the concerns are. The search opens " +
                "the page in a new window so you can open as many as needed and compare the results. If using to help diagnosis you should use only <b>'Closed'</b> cases."
            break;
        case "blsearch":
            helptxt = "Summary Lists the DTC's as a sum of how many there were based on the criteria selected. Detailed shows each DTC instance with VIN sho you can see all the vehicles that set that particular code"
            break;
        case "phonequest":
            helptxt = "Select the Report you're looking for then select a Date or a Date Range for the Report. When Selecting Phone/HTSS Number <i>You Must</i> enter a Phone/HTSS Number.<br><b>NOTE:</b> For All Reports Except for the Phone/HTSS Number you <b>Must</b> Select a Date or Date Range.";
            break;
    }
    $.alerts.dialogClass = "help"
    $.alerts.okButton = "Done";
    jAlert(helptxt, "HELP");
    $.alerts.dialogClass = null;
    $.alerts.okButton = "Ok";
}

function pqActionPost(what) {
    switch (what) {
        case "raw":
            var oForm = document.getElementById("pqform");
            oForm.setAttribute('action', 'PqReportxls.php');
            oForm.setAttribute('target', '_blank');
            break;
        case "login":
            var oForm = document.getElementById("pqform");
            oForm.setAttribute('action', 'lgReportxls.php');
            oForm.setAttribute('target', '_blank');
            break;
        case "phone":
            var tBox = document.getElementById("recNum");
            tBox.removeAttribute("disabled");
            var oForm = document.getElementById("pqform");
            oForm.setAttribute('action', 'javascript:pqRep("phone")');
            oForm.removeAttribute("target");
            break;
        case "offered":
            var oForm = document.getElementById("pqform");
            oForm.setAttribute('action', 'javascript:pqRep("offered")');
            oForm.removeAttribute("target");
            break;
        case "ansaban":
            var oForm = document.getElementById("pqform");
            oForm.setAttribute('action', 'javascript:pqRep("ansaban")');
            oForm.removeAttribute("target");
            break;
        case "answered":
            var oForm = document.getElementById("pqform");
            oForm.setAttribute('action', 'javascript:pqRep("answered")');
            oForm.removeAttribute("target");
            break;
        case "mpc":
            var oForm = document.getElementById("pqform");
            oForm.setAttribute('action', 'javascript:pqRep("mpc")');
            oForm.removeAttribute("target");
            break;
    }
    if (what != "phone") {
        var tBox = document.getElementById("recNum");
        tBox.value = "";
        tBox.setAttribute('disabled', true);
    }
}

function pqRep(action) {
    xmlhttp = GetXmlHttpObject()
    var snum = document.getElementById("recNum").value;
    var bd = document.getElementById("begindate").value;
    var ed = document.getElementById("enddate").value;
    switch (action) {
        case "phone":
            var url = "../phone_data/pqReport.php?val=" + snum + "&bdte=" + bd + "&edte=" + ed;
            xmlhttp.onreadystatechange = pageResults;
            xmlhttp.open("GET", url, true);
            xmlhttp.send(null);
            break;
        case "offered":
            var url = "../phone_data/offered_calls.php?bdte=" + bd + "&edte=" + ed;
            window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes");
            break;
        case "ansaban":
            var url = "../phone_data/answered_abandoned_bytimeblock.php?bdte=" + bd + "&edte=" + ed;
            window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes");
            break;
        case "answered":
            var url = "../phone_data/answered_calls.php?bdte=" + bd + "&edte=" + ed;
            window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes");
            break;
        case "mpc":
            var url = "../phone_data/minutes_per_call.php?bdte=" + bd + "&edte=" + ed;
            window.open(url, "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes, copyhistory=yes");
            break;
    }
}

function changePic(pic) {
    pic = "common/support/training_centers/" + pic;
    currentpic = $("#showtc").attr("src");
    if (currentpic == "common/support/training_centers/map.png") {
        $("#showtc").attr("src", pic)
    } else {
        $("#showtc").attr("src", "common/support/training_centers/map.png")
    }
    //$("#mapDisplay").attr("src",pic);
    //document.getElementById("reportbox").style.display="inline";
    // $('#reportbox').center(true);
}