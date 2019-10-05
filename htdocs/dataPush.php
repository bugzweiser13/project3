<?php
    include_once "connection.php";

    $fseId=$_POST['fseId'];
    $fse=$_POST['fse'];
    $caseNum=$_POST['caseNum'];
    $htssCase=$_POST['htssCase'];
    $dealerCode=$_POST['dealerCode'];
    $vin=$_POST['vin'];
    $year=$_POST['year'];
    $model=$_POST['model'];
    $miles=$_POST['miles'];
    $visits=$_POST['visits'];
    $lastContact=$_POST['lastContact'];

    $query = "INSERT into case_save(fse_id, fse, caseNum, htssCase, dealerCode, vin, year, model, miles, visits, lastContact) values ('$fseId','$fse', '$caseNum','$htssCase','$dealerCode', '$vin', '$year', '$model', '$miles', '$visits', '$lastContact')"; //Insert query

    $result = mysqli_query($conn, $query);

    if($result){
    echo "Case Saved Succesfully!";
    } else {
        echo "Case Already Saved or Save Failed!";
    }

    $note=$_POST['note'];
    $caseNum=$_POST['caseNum'];

    // $query2 = "INSERT into case_save (notes values ('$note') WHERE caseNum = '$caseNum"; //Insert query

    $query2 = "UPDATE crm_save
    SET notes = '$note'
    WHERE caseNum = '$caseNum";

    $result2 = mysqli_query($conn, $query2);

    if($result2){
    echo "Case Saved Succesfully!";
    } else {
        echo "Case Already Saved or Save Failed!";
    }


mysqli_close($conn); // Connection Closed.