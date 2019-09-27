<?php
    include_once "connection.php";
    include 'ChromePhp.php';

    // ini_set("memory_limit","3000M");

    // if (filemtime('cache.txt') < time()-1*1800) {

        $query = "SELECT * FROM crm_data INNER JOIN fse_dealer_master ON crm_data.Dealer_Code=fse_dealer_master.dealer_code INNER JOIN fse_list ON fse_dealer_master.fse=fse_list.fse";

        $result = mysqli_query($conn, $query);

        if ($row = mysqli_fetch_array($result)) {
     
            // $rows = array();
            
            $return_arr = array();

            while ($row = mysqli_fetch_array($result)) {
                $fseId = trim($row['fse_id']);
                $fseLat = trim($row['fse_lat']);
                $fseLng = trim($row['fse_lng']);
                $fse = trim($row['FSE']);
                $dealer = trim($row['Dealer_Code']);             
                $caseNum = trim($row['Case#']);
                $htssCaseNum = trim($row['HTSS_Case#']);
                $technician = trim($row['Dealer_Technician']);
                $visits = trim($row['Visits']);
                $callCount = trim($row['Call_Count']);
                $vin = trim($row['VIN']);
                $year = trim($row['Year']);
                $model = trim($row['Model']);
                $miles = trim($row['Miles']);

                //$concern = trim($row['Customer_Concern']);
                //$concern = ['Customer_Concern'];

                $myvalue = $row['Customer_Concern'];
                // $arr = explode(' ',trim($myvalue));
                //$test = $arr[0]; // will print Test

                $concern = implode(' ', array_slice(explode(' ', $myvalue), 0, 21));

                $opened = trim($row['Opened']);
                $lastContact = trim($row['Last_Contact']);
                $caseStatus = trim($row['Status']);
                $zipcode = trim($row['zipcode']);
                $mapZoom = trim($row['map_zoom']);
                $dealerName = trim($row['dealer_name']);
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
                    "technician" => $technician,
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
                    "dealerName" => $dealerName,
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
        // echo json_encode($return_arr);
        echo json_encode($return_arr);
        
        exit();
     }

    
    // else {
    //     echo 'An error occured: data could not be extracted from the database.';
    // }
// }
// else {
//     $data = unserialize(file_get_contents('cache.txt'));
//     echo $data;
// }