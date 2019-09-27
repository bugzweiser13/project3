<?php
    include_once "connection.php";
?>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<!-- Custom CSS -->
<!-- <link rel="stylesheet" type="text/css" href="css/reset.css"> -->
<!-- jQuery -->
<script src="https://code.jquery.com/jquery.js"></script>
<!-- <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"> -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
<!-- Bootstap CSS -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<!-- Font Awesome Icons -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link href="https://fonts.googleapis.com/css?family=Alfa+Slab+One|Jura&display=swap" rel="stylesheet">
<!--custom css-->
<link rel="stylesheet" type="text/css" href="css/casedata.css"> 

<header> 
  <img src="img/fse/n_header2ab.jpg" alt="n_header2a.jpg" class="header2a">
</header>
    
</head>
<body>

<?php

//Dropdown Population


// $cat=$_POST['cat'];
$fseName=$_POST['fseName'];
$dealer=$_POST['dealer'];
$visits=$_POST['visits'];
$calls=$_POST['calls'];
$fromDate=$_POST['fromDate'];
$endDate=$_POST['endDate'];

//Table Data Population



if ($dealer === "all"){

    $sql = "SELECT * FROM crm_data
    INNER JOIN fse_dealer_master
    ON crm_data.Dealer_Code=fse_dealer_master.dealer_code 
    INNER JOIN fse_list 
    ON crm_data.FSE=fse_list.fse WHERE
                                                crm_data.FSE LIKE '$fseName' AND
                                                crm_data.Visits >= '$visits' AND
                                                crm_data.Call_Count LIKE '$calls' AND          
                                                crm_data.Last_Contact BETWEEN '".$fromDate."' AND '".$endDate."' ORDER BY Last_Contact";

    // $sql = "SELECT * FROM `crm_data` WHERE
    //                                         FSE LIKE '$fseName' AND
    //                                         Visits >= '$visits' AND
    //                                         Call_Count LIKE '$calls' AND          
    //                                         Last_Contact BETWEEN '".$fromDate."' AND '".$endDate."' ORDER BY Last_Contact";

    $result = mysqli_query($conn, $sql);

    tableGen($result);

} else {

    $sql = "SELECT * FROM crm_data
    INNER JOIN fse_dealer_master
    ON crm_data.Dealer_Code=fse_dealer_master.dealer_code 
    INNER JOIN fse_list 
    ON crm_data.FSE=fse_list.fse WHERE
                                    crm_data.dealer_code LIKE '$dealer' AND
                                    crm_data.Visits >= '$visits' AND
                                    crm_data.Call_Count LIKE '$calls' AND          
                                    crm_data.Last_Contact BETWEEN '".$fromDate."' AND '".$endDate."' ORDER BY Last_Contact";

    // $sql = "SELECT * FROM `crm_data` INNER JOIN fse_list ON crm_data.FSE=fse_list.fse WHERE
    //                                                         dealer_code LIKE '$dealer' AND
    //                                                         Visits >= '$visits' AND
    //                                                         Call_Count LIKE '$calls' AND
    //                                                         Last_Contact BETWEEN '".$fromDate."' AND '".$endDate."' ORDER BY Last_Contact";
                                
    $result = mysqli_query($conn, $sql);

    tableGen($result);
};

function tableGen($result){

    if ($result) {
        // it return number of rows in the table.
        $row = mysqli_num_rows($result);    
        echo "<div id='count' style='text-align:center;'><p>Number of Cases Shown from Selection: <span>".$row."</span></p></div>";
        
        // printf("Number of Cases Shown: " . $row );
    }

echo "<table>
<thead>
<tr>
<th>Techline Case#</th>
<th>HTSS Connect Case#</th>
<th>FSE</th>
<th>Dealer Code</th>
<th>Visits</th>
<th>Call Count</th>
<th>VIN</th>
<th>Year</th>
<th>Model</th>
<th>Mileage</th>
<th>Case Opened</th>
<th>Last Contact</th>
<th>Case Status</th>
</tr>
</thead>";

    //  Need the following for table links:
    //  1)direct link address to HTSS Connect Vin Search (Case#) after login challenge (if possible)

    //table data population
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
     
        echo "<tbody>
            <tr>";
//          echo "<td><input type='checkbox' name='select' value='select'><br></td>"; //need to add echo above to add to table
            echo "<td><a href='http://10.112.5.10/vinoogle/techviewer.php?caseNum=" . $row['Case#'] ."' 
            target='_blank' title='" .$row['Customer_Concern']. $row['Dealer_Technician']. "'>" . $row['Case#'] . "</a></td>";
//          echo "<td><a href ='http://connect.tecklinks.com' target='_blank' title='Update Techline Case'>Update Case</a></td>";
//          echo "<td><a href ='https://connect.tecklinks.com/user/vin_search.aspx#' target='_blank' title='Update Techline Case'>Update Case</a></td>";
            echo "<td><a href ='https://connect.tecklinks.com/user/case_manage.aspx?type=mod&hc_case_no=" .$row['HTSS_Case#'] ."&search_param=%7B%22search_type%22%3A%22vin%22%2C%22search_text%22%3A%22" . $row['VIN'] . "%22%7D' 
            target='_blank' title='Update Techline Case'>" .$row['HTSS_Case#'] . "</a></td>";
            echo "<td>" . $row['FSE'].          "</td>";
            echo "<td><a href='https://gds.hyundaitechinfo.com:447/eReport/diaglist.aspx?&uid=" . $row['Dealer_Code'] . "GDS&cpcode=B28AA" . $row['Dealer_Code'] . "&vin=" . $row['VIN'] . "&device=GDSM"."';
            target='_blank' title='".$row['dealer_name']." eReport Information'>" . $row['Dealer_Code'] . "</a></td>";
            echo "<td>" . $row['Visits'].       "</td>";
            echo "<td>" . $row['Call_Count'].   "</td>";
            echo "<td><a href='http://10.112.5.10/vinoogle/_vinoogle.php?vinnum=" . $row['VIN'] . "' 
            target='_blank' title='VinQuest'>" . $row['VIN'] . "</a></td>";
            echo "<td>" . $row['Year'].         "</td>";
            echo "<td>" . $row['Model'].        "</td>";
            echo "<td>" . $row['Miles'].        "</td>";
            echo "<td>" . date('m-d-Y', strtotime($row['Opened'])).       "</td>";
            echo "<td>" . date('m-d-Y', strtotime($row['Last_Contact'])). "</td>";
            echo "<td>" . $row['Status'].        "</td>";
            echo "</tr>
        </tbody>";

            // $dealerJSON = json_encode($row['Dealer_Code']);

            // echo $dealerJSON;

        }
    } else {
        echo "<tr>";
        echo "<td colspan='13'><b><i>No Records / Data Found (or search fields blank).</i></b></td>";
        echo "</tr>";
    }
   echo "</table>";
} 
?>

<br>

<img src="img/logos/email.jpg" alt="email.jpg" style="width: 20px; float:left">
    <a href="mailto:?subject=FSE%20Techline%20Case%20Review%20<?php

       //$select=$_GET['select'];
        
            $sql = "SELECT * FROM `crm_data` WHERE dealer_code='".$dealer."'"; //AND $select='true'";
            $result = mysqli_query($conn,$sql);

            while($row = mysqli_fetch_array($result)) {
                echo $row['Dealer_Code'];
                break;
            }
        ?>&body=Dear%0D%0A%0D%0APlease%20see%20the%20cases%20below:%0D%0A%0D%0A

        <?php

        $sql = "SELECT * FROM `crm_data` WHERE 
                                            dealer_code='".$dealer."' AND 
                                            Visits >= '".$visits."' AND 
                                            Call_Count LIKE '".$calls."' AND
                                            Last_Contact BETWEEN '".$fromDate."' AND '".$endDate."' ORDER BY Last_Contact";

            $result = mysqli_query($conn,$sql);


                while($row = mysqli_fetch_array($result)) {
        
                    echo "Case #: "                . $row['Case#']          ;?>%20<?php
                    echo "Visits: "                . $row['Visits']         ;?>%20<?php
                    echo "Calls: "                 . $row['Call_Count']     ;?>%20<?php
                    echo "VIN: "                   . $row['VIN']            ;?>%20<?php
                    echo "Year: "                  . $row['Year']           ;?>%20<?php
                    echo "Model: "                 . $row['Model']          ;?>%20<?php
                    echo "Mileage: "               . $row['Miles']          ;?>%20<?php
                    echo "Last Techline Contact: " . date('m-d-Y', strtotime($row['Last_Contact']))   ;?>%0D%0A%20%20%20%20%20%20%20%20<?php

            }
        ?>%0D%0AEnter%20e-mail%20body%20here(overwrite)%0D%0A%0D%0A%0D%0A%0D%0AThank%20You,%0D%0A%0D%0A
 
        <?php 
 
            $sql = "SELECT * FROM `crm_data` WHERE dealer_code='".$dealer."'";
            $result = mysqli_query($conn,$sql);
                while($row = mysqli_fetch_array($result)) {
                    echo $row['FSE'];
                    break;
                }
            mysqli_close($conn);
        ?>"title="Email Service Manager">Send Email To Dealer	&nbsp;

 <!--need to correct cal.php file to add SQL data and correct dates-->  

        <img src="img/logos/calendar.jpg" alt="email.jpg" style="width: 15px;">
            <a href="cal.php">Add Visit to Calendar</a>

</body>
<!-- <script src="js/test.js"></script> -->
</html>