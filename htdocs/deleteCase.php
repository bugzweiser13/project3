<?php
    include_once "connection.php";

    $caseNum=$_POST['caseNum'];

    $query = "DELETE FROM case_save WHERE caseNum like '$caseNum'";

    $result = mysqli_query($conn, $query);

    if($result){
    echo "Case Deleted Succesfully!";
    } else {
        echo "Case Delete Failed!";
    }

mysqli_close($conn); // Connection Closed.