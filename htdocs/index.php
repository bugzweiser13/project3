<?php
    include_once "connection.php";
    ?>

<!DOCTYPE html>
<html lang="en">
<head>
<title>FSE Login Portal</title>
<link rel="icon"  href="favicon.ico"/>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="pragma" content="no-cache" />
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
<link href="https://fonts.googleapis.com/css?family=Alfa+Slab+One|Jura&display=swap" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="css/style.css">
<link rel="stylesheet" type="text/css" href="css/login_style.css">

<header>  
  <img src="img/fse/n_header1.jpg" alt="veloster_n">
</header>

</head>

<body>

<?php
    //database connectivity 
        if(isset($_POST['sub'])){
            
            $username = $_POST['username'];
            $password = $_POST['password'];
            $apw = mysqli_query($conn,"select password from fse_login where username='$username'");
            $adminPw=mysqli_fetch_assoc($apw);

            $res = mysqli_query($conn,"select 'username', 'password' from fse_login where username='$username' and password='$password'");
            $result=mysqli_fetch_array($res);
           
            $passId =  mysqli_query($conn, "select fse_id from fse_login where username='$username'");
            $id=mysqli_fetch_assoc($passId);


            // $admin = mysqli_query($cser,"select 'username', 'password' from fse_login where username='$username' and password='$password'");
            // $adminLog=mysqli_fetch_array($admin);

         if ($username === 'admin' && $password === $adminPw['password']){
                header("location:fse_portal_a.php");
            }

            // debugging
            // $log = var_export($password);
            // $log = var_export($adminPw['password']);

            //  function console_log( $adminPw ){
            //     echo '<script>';
            //     echo 'console.log('. json_encode( $adminPw['password'] ) .')';
            //     echo '</script>';
            //   }

        if($result && $id['fse_id'] > 0) {
            header("location:portal.php?cat=" . $id['fse_id'] . "");

        //    $sql = "SELECT fse_id FROM `fse_login` WHERE username='".$username."'";
        //         $result1 = mysqli_query($cser,$sql);
    
        //         while($row = mysqli_fetch_array($result1)) {
        //            //echo $row['fse_id'];
        //         break;
        //         }       

            // echo "Successfully Login";
       	
        } else {
    
        //incorrect login
            echo '<h2><center><font color="red">Incorrect Username and/or Password Provided</font><center></h2>';
            header("refresh: 2; url = index.php"); 
            }
    }   
?>	

<!-- Modal Content -->
  
<form class="user_login animate" action="" method="Post">
        
    <section class="container">
        
        <div class="imgcontainer">
            <img src="img/fse/login.png" alt="avatar" class="avatar">
        </div>
        <div>
            <label for="uname"><b>Username</b></label>
            <input type="text" id="test" placeholder="Enter Username" name="username" required>
            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" required>
            <button type="submit" name="sub" value="login" title="login">Login</button>
            <input type="checkbox" checked="checked" name="remember"> Remember me 
        </div>  
        <div class="email">
            <span class="psw" title="click to request reset"><a href="mailto:jemerson@hmausa.com?subject=Please%20Reset%20My%20Password" style="text-decoration: none">Forgot Password?</a></span>
        </div>
    </section>          
</form>

<!-- <footer>
  <img src="img/fse/footer1.jpg" alt="veloster_n" />
</footer> -->

</body>
</html>