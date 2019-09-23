<?php
    include_once "connection.php";

    // ini_set("memory_limit","1000M");

    // if (filemtime('cache.txt') < time()-1*1800) {
        

        // $query = "SELECT * FROM crm_data INNER JOIN fse_list ON crm_data.FSE=fse_list.fse INNER JOIN fse_dealer_master3 ON fse_list.fse_id=fse_dealer_master3.fse_id";

        $query = "SELECT * FROM crm_data INNER JOIN fse_dealer_master4 ON crm_data.Dealer_Code=fse_dealer_master4.dealer_code INNER JOIN fse_list ON fse_dealer_master4.fse=fse_list.fse";

        $result = mysqli_query($conn, $query);

        if ($result = mysqli_query($conn, $query)) {
            // $rows = array();
        $return_arr = array();

            while ($row = mysqli_fetch_array($result)) {
                $fseId = trim($row['fse_id']);
                $fseLat = trim($row['fse_lat']);
                $fseLng = trim($row['fse_lng']);
                $dealer = trim($row['Dealer_Code']);
                $fse = trim($row['FSE']);
                $caseNum = trim($row['Case#']);
                $htssCaseNum = trim($row['HTSS_Case#']);
                $visits = trim($row['Visits']);
                $callCount = trim($row['Call_Count']);
                $vin = trim($row['VIN']);
                $year = trim($row['Year']);
                $model = trim($row['Model']);
                $miles = trim($row['Miles']);
                $concern = trim($row['Customer_Concern']);
                $opened = trim($row['Opened']);
                $lastContact = trim($row['Last_Contact']);
                $caseStatus = trim($row['Status']);
                $zipcode = trim($row['zipcode']);
                $mapZoom = trim($row['map_zoom']);
                $dealerAddress = trim($row['address']);
                $dealerCity = trim($row['city']);
                $dealerState = trim($row['state']);
                $dealerZip = trim($row['zip']);
                $lat = trim($row['lat']);
                $lng = trim($row['lng']);


                $return_arr[] = array(
            
                "fseData" => array(
                    "fseId" => $fseId, 
                    "fse" => $fse,
                    "zipcode" => $zipcode,
                    "mapZoom" => $mapZoom,
                    "fseLat" => $fseLat,
                    "fseLng" => $fseLng
                ),
                "caseData" => array(
                    "dealer" => $dealer,
                    "caseNum" => $caseNum,
                    "htssCaseNum" => $htssCaseNum,
                    "visits" => $visits,
                    "callCount" => $callCount,
                    "vin" => $vin,
                    "year" => $year,
                    "model" => $model,
                    "miles" => $miles,
                    "concern" => $concern,
                    "opened" => $opened,
                    "lastContact" => $lastContact,
                    "caseStatus" => $caseStatus
                ),
                "dealerData" => array(
                    "dealerAddress" => $dealerAddress,
                    "dealerCity" => $dealerCity,
                    "dealerState" => $dealerState,
                    "dealerZip" => $dealerZip,
                    "dealerLat" => $lat,
                    "dealerLng" => $lng
                )
                          
            );
            }
   
        // store query result in cache.txt
        // file_put_contents('cache.txt', serialize(json_encode($return_arr)));

        // Encoding array in JSON format
        echo json_encode($return_arr);
        exit();
     }

    
//     else {
//         echo 'An error occured: data could not be extracted from the database.';
//     }
// }
// else {
//     $data = unserialize(file_get_contents('cache.txt'));
//     echo $data;
// }