<?php
    include_once "connection.php";
    include 'ChromePhp.php';

   // ini_set("memory_limit","3000M");

   $query = "SELECT * FROM case_save";

   $result = mysqli_query($conn, $query);

//    if ($row = mysqli_fetch_array($result)) {

       // $rows = array();
       
    $case_save_rtn = array();

       while ($row = mysqli_fetch_array($result)) {
           $fse = trim($row['fse']);
           $fseId  =trim($row['fse_id']);
           $dealer = trim($row['dealerCode']);             
           $caseNum = trim($row['caseNum']);
           $htssCaseNum = trim($row['htssCase']);
           $vin = trim($row['vin']);
           $year = trim($row['year']);
           $model = trim($row['model']);
           $miles = trim($row['miles']);
           $visits = trim($row['visits']);
           $note = $row['notes'];
           $updated = trim($row['updated']);


           $case_save_rtn[] = array(
       
           // "caseSave" => array(
               // "fseId" => $fseId, 
               "fse" => $fse,
               "fseId" => $fseId,
               "dealer" => $dealer,
               "caseNum" => $caseNum,
               "htssCaseNum" => $htssCaseNum,
               "vin" => $vin,
               "year" => $year,
               "model" => $model,
               "miles" => $miles,
               "visits" => $visits,
               "note" => $note,
               "updated" => $updated
           // ),
           // "caseData" => array(
               
           
              
           //     "technician" => $technician,
           //     "visits" => $visits,
           //     "callCount" => $callCount,
         
           //     "concern" => $concern,
           //     "opened" => $opened,
           //     "lastContact" => $lastContact,
           //     "caseStatus" => $caseStatus
           // ),
           // "dealerData" => array(
           //     "dealerName" => $dealerName,
           //     "dealerAddress" => $dealerAddress,
           //     "dealerCity" => $dealerCity,
           //     "dealerState" => $dealerState,
           //     "dealerZip" => $dealerZip,
           //     "dealerLat" => $lat,
           //     "dealerLng" => $lng
           // )
                     
       );
   }

   // Encoding array in JSON format
   echo json_encode($case_save_rtn);
   
   exit();
// }