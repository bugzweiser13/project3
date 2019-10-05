<?php
		// include_once "config.php";
		include_once "connection.php";
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <title>FSE User Creation</title>
    <link rel="icon" href="favicon.ico" />
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Custom CSS -->
    <link rel="stylesheet" type="text/css" href="css/reset.css">
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery.js"></script>
    <!-- <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"> -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <!-- Bootstap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <!-- Font Awesome Icons -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Alfa+Slab+One|Press+Start+2P|Jura&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/user_creation.css">
</head>

<body>

    <div class="container">
        <div id="box" class="mt-3 ml-3">
            <div class="d-flex justify-content-center mt-3" id="header">
                <h3>FSE Portal User Creation</h3><br>
            </div>
            <div class="d-flex justify-content-center mt-1" id="subheader">
                <p>enter all fields to create a new user</p>
            </div>
            <form id="form" name="form">
                <div class="row justify-content-md-center">
                    <div class="col col-lg-2"></div>
                    <div class="col-md-auto">
                        <div class="form-row align-items-center mt-2"> 
                            <div class="col">
                                <label class="sr-only" for="fname">First Name</label>
                                <input type="text" class="form-control" id="fname" placeholder="enter first name"  autocomplete="off" required>
                            </div>
                            <div class="col">
                            <label class="sr-only" for="lname">Last Name</label>
                                <input type="text" class="form-control" id="lname" placeholder="enter last name"  autocomplete="off" required>
                            </div>              
                        </div>
                        <div class="form-row align-items-center mt-2">
                            <div class="col">
                                <label class="sr-only" for="pw">Password</label>
                                <input type="password" class="form-control"  id="pw" placeholder="enter password"  autocomplete="off" required>
                            </div>
                            <div class="col">
                                <label class="sr-only" for="pw">Confirm Password</label>
                                <input type="password" class="form-control"  id="pwCon" placeholder="confirm password"  autocomplete="off" required>
                            </div>
                        </div>    
                        <div class="form-row align-items-center mt-2 mb-3">
                            <div class="col">
                                <img id="loading" src="img/loadWord.gif" alt="loading.gif" style="display:none; width: 20%; ">
                                <button type="submit" id="submit" class="btn btn-info btn-sm mt-2 mr-5" style="float:right;">Submit</button>
                            </div>
                        </div>
                   
                    <div class="col col-lg-2"></div>
                </div>
            </form>
        </div>     
    </div>
</body>
<script src="js/user_creation.js"></script>
</html>