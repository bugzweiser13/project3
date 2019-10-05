<?php
    include_once "connection.php";

    $name=$_POST['name']; // Fetching Values from URL
    $uname=$_POST['uname'];
    $pw=$_POST['pw'];

    $tokenRaw = bin2hex(random_bytes(64));
    $token = strtr($tokenRaw, '+/', '-_');

    // $token=$_POST['token'];

    $query = "INSERT into fse_login(fse, username, password, token) values ('$name','$uname','$pw', '$token')"; //Insert query

    $result = mysqli_query($conn, $query);

    if($result){
    echo "User Created Succusfully!";
    } else {
        echo "Post Failed!";
    }

mysqli_close($conn); // Connection Closed.

?>