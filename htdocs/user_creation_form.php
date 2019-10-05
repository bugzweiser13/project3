<?php
    include_once "connection.php";

    $name=$_POST['name']; // Fetching Values from URL
    $uname=$_POST['uname'];
    $pw=$_POST['pw'];

    // $token=$_POST['token'];

    $query = "INSERT into fse_login2(fse, username, password, token) values ('$name','$uname','$pw', '$token')"; //Insert query

    $result = mysqli_query($conn, $query);

    if($result){
    echo "User Created Succesfully!";
    } else {
        echo "User Already Exisits!";
    }

mysqli_close($conn); // Connection Closed.

?>