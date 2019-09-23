<?php
    $conn = mysqli_connect("localhost", "root", "", "test");
    //Check connection
    if(mysqli_connect_errno()){
        echo "Failed to connect:".mysqli_connect_errno();
    }
?>