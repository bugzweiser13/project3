    <?php
    include_once "connection.php";
    
    $note=$_POST['note'];
    $caseNum=$_POST['caseNum'];

    // $query2 = "INSERT into case_save (notes values ('$note') WHERE caseNum = '$caseNum"; //Insert query

    $query2 = "UPDATE case_save
    SET notes = '$note'
    WHERE caseNum = '$caseNum'";

    $result2 = mysqli_query($conn, $query2);

    if($result2){
    echo "Note Saved / Updated Succesfully!";
    } else {
        echo "Save / Update Failed!";
    }


mysqli_close($conn); // Connection Closed.