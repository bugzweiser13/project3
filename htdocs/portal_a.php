<?php
		// include_once "config.php";
		include_once "connection.php";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>FSE Resource Portal</title>
    <link rel="icon" href="favicon.ico" />
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Custom CSS -->
    <link rel="stylesheet" type="text/css" href="css/reset.css">
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery.js"></script>
    <!-- <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"> -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <!-- Bootstap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Alfa+Slab+One|Press+Start+2P|Jura&display=swap" rel="stylesheet">
    <!---Custom CSS-->
    <link rel="stylesheet" type="text/css" href="css/portal_custom.css">

</head>

<script>
function reload(form) {
    //var val=form.cat.options[form.cat.options.selectedIndex].value;
    var val = $('#cat').val();
    self.location = 'portal_a.php?cat=' + val;
}
// </script>

<style>
    /* search inputs image population */
    /* input images */
    .vin_no_focus {
        text-align: center;
        border-radius: 5px;
        background: url(img/logos/vinquest.jpg) no-repeat center;
        background-color: white;

    }
    .vin_focus {
        border-radius: 5px;
        background: none;
        background-color: white;
        text-align: center;
        /*box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);*/
    }
    .erH_no_focus {
        border-radius: 5px;
        text-align: center;
        background: url(img/logos/ereportH.jpg) no-repeat center;
        background-color: white;

    }
    .erH_focus {
        border-radius: 5px;
        background: none;
        background-color: white;
        text-align: center;    
        /*box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);*/
    }
    .erG_no_focus {
        border-radius: 5px;
        text-align: center;
        background: url(img/logos/ereportG.jpg) no-repeat center;
        background-color: white;

    }
    .erG_focus {
        border-radius: 5px;
        background: none;
        background-color: white;
        text-align: center;
        /*box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);*/
    }
    .camp_tsb {
        border-radius: 5px;
        text-align: center;
        background: url(img/logos/tsb.jpg) no-repeat center;
        background-color: white;
        /*box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);*/
    }
    .camp_camp {
        border-radius: 5px;
        text-align: center;
        background: url(img/logos/campaign.jpg) no-repeat center;
        background-color: white;
        /*box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);*/
    }
</style>



<body>

<header> 
  <img src="img/fse/n_header4.jpg" class="ml-2" alt="n_header4.jpg" style="width: 99%">
</header>
<div class="container-fluid">
    <nav class="navbar-expand-xl navbar navbar-light mb-2 bg-primary" id="navbar1">
            <h4>Reference Links:</h4>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fa fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav ml-auto">

                <div class="dropdown">
                    <button class="btn btn-sm dropbtn" id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false">
                    <p>Internal Links</p>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <a href="http://10.112.5.10/vpn.php?pass=/index.php" target="_blank" title="All the info you will ever need...">Complete Tony Panel</a>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="btn btn-sm dropbtn" type="button" id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false">
                    <p>Techline / HTSS</p>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">        
                        <a href="https://connect.tecklinks.com/" target="_blank" title="Techline Case Access">HTSS Connect / Techline Case Entry</a>
                        <a href="https://www.tecklinks.com/" target="_blank" title="HTSS Notes (external & internal)">HTSS Techlinks / Technotes</a>				             
                    </div>
                </div>
                <div class="dropdown">
                    <button class="btn btn-sm dropbtn" type="button" id="dropdownMenuButton"  aria-haspopup="true" aria-expanded="false">
                    <p>PQMS / Seibal</p>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <a href="https://mpqms.hmausa.com/" target="_blank" title="Mobile PQMS Access">Mobile PQMS</a>
                        <a href="https://crmprod.hmausa.com/hmacrm/logon.aspx?param=eautomotive_oui" target="_blank" title="Hyundai Seibal Access">Seibal (Hyundai)</a>
                        <a href="https://prod.crm.genesismotorsusa.com/gmacrm/logon.aspx?param=eautomotive_gma" target="_blank" title="Hyundai Seibal Access">Seibal (Genesis)</a>					
                    </div>
                </div>
                <div class="dropdown">
                    <button class="btn btn-sm  dropbtn" type="button" id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false">
                <p>Service / Parts</p>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <a href="https://wdcs.hyundaidealer.com/irj/portal/iam?TargetSYS_ID=SYS0000" target="_blank" title="Hyundai Dealer Access">Hyundai Dealer Login</a>						
                        <a href="https://wdcs.genesisdealerusa.com/irj/portal/iam" target="_blank" title="Genesis Dealer Access">Genesis Dealer Login</a>	
                        <a href="https://snaponepc.com" target="_blank" title="Snap On EPC (IE / Firefox Only)">Snap On EPC (Hyundai / Genesis)</a>	
                        <a href="https://ccc.hyundai.com/nxui/ccc/index.html" target="_blank" title="Global Service Access">Global Service / Customer Care Center</a>						
                    </div>
                </div>
                <div class="dropdown" style=>
                    <button class="btn btn-sm dropbtn" type="button" id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false">
                    <p>Helpful Aides</p>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">       
                            <a href= "#" onclick="getGoals()" target="_blank" title="FSE Goal Calculator">FSE Goal Calculator</a>
                            <a href="https://owa.hisna.com" target="_blank" title="Login is: HMAxxxxx@HKE.LOCAL & Network Password">Web Mail Access (Outlook)</a>
                            <a href="excel_files/hotel_calculator.xlsx" download target="_blank" title="Hotel Bill Calculator">Hotel Bill Expense Aide (download)</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>


        <div class ="row mt-1">
            <div class="col-lg-4">
                <div class="card"  id="dataCard">
                    <div class="card-header">
                       <h4>Data</h4>
                    </div>
                    <div class="card-body">        
                <div class="row">            
                    <div class="col-lg-12">
                        <div class="card" id="mapDataCard" style="height: 480px;">
                            <div class="card-header" style="text-align: center">
                                <p>Case Heat Map <span id="heatInst">(select all dealers / cases to see locations)</span></p>
                            </div>
                            <div class="card-body">
                                <div id="map">
                                    <div class="d-flex justify-content-center mt-5">
                                        <img class="mt-3" id="loading" src="img/loading.gif" alt="loading.gif" style="width: 50%;">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-2">

                    <div class="col-lg-12">
                        <div class="card" id="quickSearchCard">
                            <div class="card-header" style="color-white;">
                                <p>Quick Searches</p>
                            </div>
                            <div class="card-body" id="qs">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <form class="searchForm" onkeyup="whichButton(event)" autocomplete="off">
                                            <!-- <ul style="list-style-type:none;"> -->
                                                <!-- <label for="vin">VinQuest:</label> -->
                                                <input type="text" id="vin" title="Enter a Valid VIN (all or partial), Case#, or HTSS# Here" class="vin_no_focus" maxlength="17" 
                                                    onfocus="javascript:$('#vin').attr('class','vin_focus')" onblur="javascript:if($('#vin').prop('value')=='') $('#vin').attr('class','vin_no_focus')" spellcheck="false">
                                                <!-- <label for="vin">TSBs:</label> -->
                                                <input type="text" id="tsb" title="Enter a Valid TSB or Campaign Number. Enter with or without the -" class="camp_camp" maxlength="12" 
                                                    onfocus="javascript:$('#tsb').attr('class','vin_focus')" onblur="javascript:if($('#tsb').prop('value')=='') $('#tsb').attr('class','camp_camp')" spellcheck="false">
                                                <!-- <label for="vin">eReport(h):</label> -->
                                                <input type="text" id="erHvin" title="Enter a Valid VIN (all or partial) for eReport Case Data " class="erH_no_focus" maxlength="17" 
                                                    onfocus="javascript:$('#erHvin').attr('class','erH_focus')" onblur="javascript:if($('#erHvin').prop('value')=='') $('#erHvin').attr('class','erH_no_focus')" spellcheck="false">
                                                <!-- <label for="vin">eReport(g):</label> -->
                                                <input type="text" id="erGvin" title="Enter a Valid VIN (all or partial) for eReport Case Data " class="erG_no_focus" maxlength="17" 
                                                    onfocus="javascript:$('#erGvin').attr('class','erG_focus')" onblur="javascript:if($('#erGvin').prop('value')=='') $('#erGvin').attr('class','erG_no_focus')" spellcheck="false">
                                            <!-- </ul> -->
                                        </form>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="col-lg-4">
                        <div class="card">
                            <div class="card-header">
                                space
                            </div>
                            <div class="card-body">
                                <form class="search" onkeyup="whichButton(event)" autocomplete="off">
                                    <ul style="list-style-type:none">
                                        <li><input type="text" id="vin" title="Enter a Valid VIN (all or partial), Case#, or HTSS# Here" class="vin_no_focus" maxlength="17" onfocus="javascript:$('#vin').attr('class','vin_focus')" onblur="javascript:if($('#vin').prop('value')=='') $('#vin').attr('class','vin_no_focus')" spellcheck="false"></li>
                                        <li><input type="text" id="tsb" title="Enter a Valid TSB or Campaign Number. Enter with or without the -" class="camp_camp" maxlength="12" onfocus="javascript:$('#tsb').attr('class','vin_focus')" onblur="javascript:if($('#tsb').prop('value')=='') $('#tsb').attr('class','camp_camp')" spellcheck="false"></li>
                                        <li><input type="text" id="erHvin" title="Enter a Valid VIN (all or partial) for eReport Case Data " class="erH_no_focus" maxlength="17" onfocus="javascript:$('#erHvin').attr('class','erH_focus')" onblur="javascript:if($('#erHvin').prop('value')=='') $('#erHvin').attr('class','erH_no_focus')" spellcheck="false"></li>
                                        <li><input type="text" id="erGvin" title="Enter a Valid VIN (all or partial) for eReport Case Data " class="erG_no_focus" maxlength="17" onfocus="javascript:$('#erGvin').attr('class','erG_focus')" onblur="javascript:if($('#erGvin').prop('value')=='') $('#erGvin').attr('class','erG_no_focus')" spellcheck="false"></li>
                                    </ul>
                                </form>
                            </div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
        </div>
        <div class="col-lg-8">
            <div class="card" id="tlCard">
                        <div class="card-header">
                            <h4>Techline Case Data
                                <a href="index.php" style="text-decoration: none; float:right; color: white;" class="logout ml-2" title="logout"><i class="fa fa-sign-out fa-lg" aria-hidden="true"></i></a>
                                <a onclick="reload()" style="text-decoration: none; cursor: pointer; float:right; color: white;" class="reload" title="reload"><i class="fa fa-refresh fa-lg" aria-hidden="true"></i></a>
                            </h4>
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class=col-lg-12>
                                	<!--FSE Data Dropdowns-->
                                    <?Php

                                    @$cat=$_GET['cat']; 
                                        if(strlen($cat) > 0 and !is_numeric($cat)){ 
                                            echo "***Data Error***";
                                        exit;
                                        }

                                    //Start of FSE Name Selection

                                    $quer2="SELECT DISTINCT * FROM fse_list"; 
                                        if(isset($cat) and strlen($cat) > 0) {
                                            $quer="SELECT DISTINCT dealer_code, dealer_id, fse FROM fse_dealer_master WHERE fse_id=$cat ORDER BY dealer_code"; 
                                        } 
                                        //else {
                                        //	"Select Name"; 
                                    //	}
                               
                                    echo "<nav class='navbar-expand-xl navbar navbar-light bg-primary' id='nav'>
                                            <h6 id='sData'>Select Data:</h6>
                                                <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup1' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
                                                    <i class='fa fa-bars'></i>
                                                </button>
                                            <div class='collapse navbar-collapse' id='navbarNavAltMarkup1'>
                                                <div class='navbar-nav ml-auto'>
                                                    <div class='dropdown'>
                                                        <div class='dropdown-menu1' aria-labelledby='dropdownMenuButton'>
                                                           <!-- <form method=post name=f1 action='casedata.php' target='casedata'> --> ";
                                                        //    <form method=post name=f1 action='casedata_selectable.php' target='casedata'>
                                    echo "<select class='btn btn-secondary btn-sm box' name='cat' id='cat' onchange='reload(this.form)'><option style='display:none;' value=''>Select FSE</option>";
                                        
                                        foreach ($conn->query($quer2) as $noticia2) {
                                            if($noticia2['fse_id']==@$cat) {
                                                echo "<option style='display:none;' selected value='$noticia2[fse_id]'>$noticia2[fse]</option>"; //preloads FSE selected at login by fse_id #
                                                
                                                // $fseName = trim($noticia2['fse']);
                                                // echo "<input type='hidden' name='fseName' id='fseNameTrig' value='".$fseName."'></input>";
                                                
                                                // $fseZip = trim($noticia2['zipcode']);
                                                
                                            } else {
                                                echo"<option value='$noticia2[fse_id]'>$noticia2[fse]</option>"; //Comment out to block all FSE selections
                                            }
                                        }           
                                        
                                        
                                        $fseName = trim($noticia2['fse']);
                                        echo "<input type='hidden' style='diplay: none;' name='fseName' id='fseNameTrig' value='".$fseName."'></input>";
                                                
                                        $fseZip = trim($noticia2['zipcode']);

                                        echo "</select>
                                        </div>
                                        </div>";
                                    
                                    //End of FSE Name Selection

                                    //Start Dealer Code Selection
                                    echo "<div class='dropdown'>
                                    <div class='dropdown-menu1' aria-labelledby='dropdownMenuButton'>
                                        <select class='btn btn-secondary btn-sm dropdown-toggle box ml-1' name='dealer' id='dealerCode' title='Select Dealer Code'><option value='' style='display:none;'>Dealer Code</option>
                                            <option value='all'>All Dealers</option>"."<BR>";
                                            
                                        foreach ($conn->query($quer) as $noticia) {
                                            echo  "<option value='$noticia[dealer_code]'>$noticia[dealer_code]</option>";
                                        }
                                            //echo  "<option value='%'>All Cases</option>"."<BR>"; (if all case data is wanted, will only populate all FSE data)
                                    echo "</select>
                                    </div></div>";

                                    //End of Dealer Code Selection

                                    //Start of Visits Selection
                                    echo "<div class='dropdown'>
                                    <div class='dropdown-menu1' aria-labelledby='dropdownMenuButton'>
                                        <select class='btn btn-secondary btn-sm dropdown-toggle box ml-1' name='visits' id='visitAmt' title='Select Amount of Visits'><option value='' style='display:none;'>Visits</option>";
                                        foreach ($conn->query($quer) as $noticia) {
                                            //echo  "<option value='1'>1</option>"."<BR>";
                                            echo  "<option value='2'>2</option>"."<BR>";
                                            echo  "<option value='3'>3</option>"."<BR>";
                                            echo  "<option value='4'>4</option>"."<BR>";
                                            echo  "<option value='5'>5</option>"."<BR>";
                                            //echo  "<option value='%'>All Cases</option>"."<BR>"; // >= needs to be changed to LIKE in casedata.php
                                            echo  "<option value='1'>All Cases</option>"."<BR>";
                                            break;
                                        }
                                            echo "</select>
                                            </div></div>";

                                    //End of Visits Selection
                                            
                                    //Start of Call Count Selection
                                    echo "<div class='dropdown'>
                                    <div class='dropdown-menu1' aria-labelledby='dropdownMenuButton'>
                                        <select class='btn btn-secondary btn-sm dropdown-toggle box ml-1' name='calls' id='callAmt' title='Select Call Count'><option value='' style='display:none;'>Call Count</option>";
                                        foreach ($conn->query($quer) as $noticia) {
                                            echo  "<option value='1'>1</option>"."<BR>";
                                            echo  "<option value='2'>2</option>"."<BR>";
                                            echo  "<option value='3'>3</option>"."<BR>";
                                            echo  "<option value='4'>4</option>"."<BR>";
                                            echo  "<option value='5'>5</option>"."<BR>";
                                            echo  "<option value='%'>All Cases</option>"."<BR>";
                                            break;
                                        }
                                            echo "</select>
                                            </div></div>";

                                    //Date Range Selection

                                    $year = date('Y');
                                    $month = date('m');
                                    $day = date('d');

                                    $strtDte = date('Y-m-d', strtotime("-1 week")); //1 week ago
                                    $endDte = "$year-$month-$day";

                                    echo "<div id='dte'>
                                            <div class='dropdown-menu1' aria-labelledby='dropdownMenuButton'>
                                                <h6 class='ml-3' id='sDate'>Date Range: </h6><input type='date' min='2019-01-01' class='date ml-2 mr-1' name='fromDate' id='strtDte' value='" . $strtDte . "' title='Select Start Date'>
                                                    <b>~</b><input type='date' class='date ml-1' name='endDate' id='endDte' value='" . $endDte . "' title='Select End Date'>
                                            </div>
                                        </div>";

                                    //Data Fetch Button
                                    echo "<div>
                                            <button class='btn btn-secondary btn-sm fetch ml-2' type='submit' id='dsearch' title='Fetch Case Data'>Fetch</button>";
                                            //echo "";
                                    echo "</div>
                                        </form>
                                     </nav>"
                                    ?>
                                </div>
                            </div>
                        <div class="row mt-1">
                            <!-- <div class="col-lg-12 case" >
                                <iframe name="casedata" class="mt-2" id="caseData" src="img/fse/n_header2ab.jpg" class="header2" style="width: 100%;"></iframe>	
                                <caption><font size="2px", font color="red"><i id="caption">***All Field Items Above Must Be Selected, to Populate Case Data Here***</i></caption>
                            </div> -->
                            <div class="col-lg-12 mt-1" id="caseData">
                                <img src="img/fse/n_header2abc.jpg" class="header2" style="width: 25%;">
                                <p class="mr-2 mt-3" style="float:right;">cases shown: <span class="ml-2" id="cases">00</span></p>
                                <button type="button" class="btn btn-primary btn-sm mt-3 mr-2" id="saveCase" style="float:right; display: none;" title="select case/s below then press save">Save Case</button>
            
                                <table>
                                <table class="table table-striped table-hover table-sm" id="tlPlot">
                                    <!-- <div id="noCase"><p>There are No Cases from Selection Chosen</p></div> -->
                                <thead id="tableHead" Style="font-weight: bolder; font-style: italic; font-size: 15px; text-align: center;">
                                    <tr>
                                        <th scope="col">Select</th>
                                        <th scope="col">Techline Case#</th>
                                        <th scope="col">HTSS Case#</th>
                                        <th scope="col">FSE</th>
                                        <th scope="col">Dealer Code</th>
                                        <th scope="col">Visits</th>
                                        <th scope="col">Call Count</th>
                                        <th scope="col">VIN</th>
                                        <th scope="col">Year</th>
                                        <th scope="col">Model</th>
                                        <th scope="col">Mileage</th>
                                        <th scope="col">Case Opened</th>
                                        <th scope="col">Last Contact</th>
                                        <th scope="col">Case Status</th>
                                    </tr>
                                </thead>
                                <tbody id=tlData Style="font-size: 13px;">
                                    <tr>   
                                        <!-- <td colspan='14' id="noCase" style="display: none;"><i>No Records / Data Found (or search fields blank).</i></td>   -->
                                    </tr>
                                    <!-- <div id="logo"><img src="img/logos/h_logo.jpg" alt="img/logos/h_logo.jpg" style="width: 100%;"></div> -->
                                </tbody>
                                </table>
                            </div>
                        </div>    
                    </div>
                <div>
                    <p id="caption">***All Field Items Above Must Be Selected, to Populate Case Data Here***</p>
                </div>    
            </div>
        </div>
    </div>       
</div>
<script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBfK8XXYOXRP5dOjqAoareMeTU5Bo4bSQA"></script>
</body>
<script src="js/scripts.js"></script>
<script src="js/portalScript.js"></script>
<!-- <script src="js/test2.js"></script> -->
</html>