<?php
    include_once "connection.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
<title>FSE Goal Management</title>
<link rel="icon"  href="favicon.ico"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<link rel="stylesheet" type="text/css" href="css/reset.css">
<link rel="stylesheet" type="text/css" href="css/style.css">
<link rel="stylesheet" type="text/css" href="css/goals_style.css">

<!--<script src="js/jquery-current.js"></script>
<script src="js/jquery.alerts.js"></script>
<script src="js/jquery.interface.js"></script>
<script src="js/scripts.js"></script>
<script src="js/input_box.js"></script>
<script src="/js/qs_input.js"></script>
<script src="js/moment.min.js"></script>-->

<header class="header"> 
  <img src="img/fse/n_header5.jpg" alt="n_header4.jpg">
</header>


<!--<script language=JavaScript> //needed if multiple FSE within list (supervisor access)
	function reload(form) {
		var val=form.cat.options[form.cat.options.selectedIndex].value;
		self.location='fse_goals.php?cat=' + val ;
	}
</script>-->

</head>
<body>

<section class="data"><br>      
      
  <div class="goals_title" hidden><!--Select Name Below: used in admin/supervisor panel-->
    <?Php
		  		@$cat=$_GET['cat']; 
		  			if(strlen($cat) > 0 and !is_numeric($cat)){ 
		  				echo "Data Error";
		  			exit;
		  			}
		  		$quer2="SELECT DISTINCT fse,fse_id FROM fse_list"; 
		  			if(isset($cat) and strlen($cat) > 0) {
		  				$quer="SELECT DISTINCT dealer_code, dealer_id FROM fse_dealer_master where fse_id=$cat order by dealer_code"; 
		  			} 
		  			else {
		  				"Select Name"; 
		  			} 

  						//echo "<form method=post name=f1 action='casedata.php' target='casedata'>";
	  					echo "<a>FSE: <select class='box_fse' name='cat' title='Select FSE Name' onchange='reload(this.form)'><option value=''>Select FSE Name</option>";
					
		  			foreach ($conn->query($quer2) as $noticia2) {
			  			if($noticia2['fse_id']==@$cat) {
				  			echo "<option selected value='$noticia2[fse_id]'>$noticia2[fse]</option>"."<BR>";
					  	}
						  else {
			  			//	echo"<option value='$noticia2[fse_id]'>$noticia2[fse]</option>"; //use in admin/supervisor panel
			  			}
			  		}
              echo "</a></select>";
    ?>
      <!--<a href="fse_goals.php" style="text-decoration: none">
        <img src="img/logos/reload2.jpg" class="reload" title="Reload This Page" alt="reload2.jpg">
      </a>-->

	</div>
	
	<br>

	<div class="goals">

		<div class="goalimg">
			<img src="img/fse/goals.jpg" alt="goals.jpg">
		</div>
	
    <div id="fse_label"><p>FSE Selected: 
            
        <?php 
        
        $query = "SELECT *, fse, fse_id FROM fse_list WHERE fse_id = '$cat'";
	 
        $result = mysqli_query($conn,$query);

		while($row = mysqli_fetch_array($result)){

            echo "<a id='fse_name'>" . $row['fse'] . "</a>";
		}
			if (!$result) {
				printf("Error: %s\n", mysqli_error($conn));
			exit();
	    }

        ?>
        
    </p></div>

		<hr>
		<div class="goalname">
			<ul style="list-style-type:none">
				<li><a class="goal_1">Assistance Request Acknowledge Average: 
					<input class="box1" id="aravg" value="<?php
						$query = "SELECT *, AVG(DATEDIFF(`Acknowledged`,`Requested`)) as diff FROM requests WHERE FSE LIKE (SELECT fse FROM fse_list_pqms WHERE fse_id = '$cat')";
							$result = mysqli_query($conn,$query);
								// show result
								while($row = mysqli_fetch_array($result)){		
									echo "". substr($row['diff'], 0,4) ."";}?>"> Goal: 
					<input class="box2" style="margin-bottom: 2px;" value="<7"> Days&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li><!--
	   --><li><a class="goal_1">Assistance Request Close Average: 
					<input class="box1" id="arclose" value="<?php
						$query = "SELECT *, AVG(DATEDIFF(`Closed`,`Requested`)) as diff FROM requests WHERE FSE LIKE (SELECT fse FROM fse_list_pqms WHERE fse_id = '$cat')";
							$result = mysqli_query($conn,$query);		
								// show result
								while($row = mysqli_fetch_array($result)){		
									echo "". substr($row['diff'], 0,4) ."";}?>"> Goal: 
						<input class="box2" style="margin-bottom: 2px;" value="<30"> Days&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li><!--
			--><li><a class="goal_1">Dealer Contact Report Complition Average: 
					<input class="box1" id="dcravg" value ="<?php
							$query = "SELECT *, AVG(DATEDIFF(`Report_Date`,`Date_of_Visit`)) as diff FROM contacts WHERE `Report_No.` IS NOT null AND substring(FSE,12) LIKE (SELECT fse FROM fse_list_pqms WHERE fse_id = '$cat')";
								$result = mysqli_query($conn,$query);
									// show result
									while($row = mysqli_fetch_array($result)){		
										echo "". substr($row['diff'], 0,4) ."";} ?>"> Goal: 
						<input class="box2" style="margin-bottom: 2px;" value="<7"> Days&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li><!--
			--><li><a class="goal_1"style="margin-bottom: 2px;">Dealer Contact Report Completed Total: 
			<input class="box1" value ="<?php
							$query = "SELECT *, COUNT(contacts_id) FROM contacts WHERE substring(FSE,12) LIKE (SELECT fse FROM fse_list_pqms WHERE fse_id = '$cat')";			
								$result = mysqli_query($conn,$query);			
									// show result
									while($row = mysqli_fetch_array($result)){						
										echo "". $row['COUNT(contacts_id)'] ."";}?>"> Goal: 
                        <input class="box3" style="margin-bottom: 2px;" value="<?php
                            $query = "SELECT *, dcr_total FROM fse_type WHERE type = (SELECT type FROM fse_list WHERE fse_id = '$cat')";
	                            $result = mysqli_query($conn,$query);
                                    // show results
                                    while($row = mysqli_fetch_array($result)){
                                        echo "". $row['dcr_total'] . "";}?>"> Reports</a></li><!--
			--><li><a class="goal_1">PQMS Reports Written: 
					<input class="box1" value="<?php
							$query = "SELECT *, COUNT(reports_id) FROM reports WHERE FSE_Name LIKE (SELECT fse FROM fse_list_pqms WHERE fse_id = '$cat')";
	 							$result = mysqli_query($conn,$query);
 									// Print out result
		 							while($row = mysqli_fetch_array($result)){				
										 echo "". $row['COUNT(reports_id)'] ."";}?>"> Goal: 
                        <input class="box3" style="margin-bottom: 2px;" value="<?php 
                        	$query = "SELECT *, pqms_rep FROM fse_type WHERE type = (SELECT type FROM fse_list WHERE fse_id = '$cat')";
	                            $result = mysqli_query($conn,$query);
                                    // show results
                                    while($row = mysqli_fetch_array($result)){
                                         echo "". $row['pqms_rep'] . "";}?>"> Reports</a></li>
			</ul>
		</div>
	</div>
	
	
<div id="background_info" hidden>	
<?php
// FSE Report Counter

//PQMS Reports
	
	$query = "SELECT *, COUNT(reports_id) FROM reports WHERE FSE_Name LIKE (SELECT fse FROM fse_list_pqms WHERE fse_id = '$cat')";
	 
	$result = mysqli_query($conn,$query);

// Print out result
		while($row = mysqli_fetch_array($result)){
			//echo "There are ". $row['COUNT(reports_id)'] ." reports for ".substr($row['FSE_Name'], 0, strpos($row['FSE_Name'], ',')) ." ";

			echo "". $row['FSE_Name'] . ": &nbsp;". $row['COUNT(reports_id)'] ." Reports Completed";
		}
			if (!$result) {
				printf("Error: %s\n", mysqli_error($conn));
			exit();
	}

//Dealer Contact Count

	$query = "SELECT *, COUNT(contacts_id) FROM contacts WHERE substring(FSE,12) LIKE (SELECT fse FROM fse_list_pqms WHERE fse_id = '$cat')";

	$result = mysqli_query($conn,$query);

// Print out result
		while($row = mysqli_fetch_array($result)){		
			echo "<br>".substr($row['FSE'],11)."";
			echo ": &nbsp;". $row['COUNT(contacts_id)'] ." Dealer Contacts Completed";
		}
			if (!$result) {
				printf("Error: %s\n", mysqli_error($conn));
			exit();
	}

//DCR Complition Average

$query = "SELECT *, AVG(DATEDIFF(`Report_Date`,`Date_of_Visit`)) as diff FROM contacts WHERE `Report_No.` IS NOT null AND substring(FSE,12) LIKE (SELECT fse FROM fse_list_pqms WHERE fse_id = '$cat')";

$result = mysqli_query($conn,$query);
	
// show result
	while($row = mysqli_fetch_array($result)){
			echo "<br>".substr($row['FSE'],11)."";
			echo ": &nbsp;".substr($row['diff'], 1,3)." DCR Completion Average";
		}
			if (!$result) {
				printf("Error: %s\n", mysqli_error($conn));
			exit();
	}

//Assistance Request Close Average

	$query = "SELECT *, AVG(DATEDIFF(`Closed`,`Requested`)) as diff FROM requests WHERE FSE LIKE (SELECT fse FROM fse_list_pqms WHERE fse_id = '$cat')";

	$result = mysqli_query($conn,$query);

// Print out result
		while($row = mysqli_fetch_array($result)){		
			echo "<br>".$row['FSE']."";
			echo ": &nbsp;". substr($row['diff'], 0,4) ." Request Close Average";
		}
			if (!$result) {
				printf("Error: %s\n", mysqli_error($conn));
			exit();
	}	

	//Assistance Request Acknowlege Average

	$query = "SELECT *, AVG(DATEDIFF(`Acknowledged`, `Requested`)) as diff FROM requests WHERE FSE LIKE (SELECT fse FROM fse_list_pqms WHERE fse_id = '$cat')";

	$result = mysqli_query($conn,$query);

// Print out result
		while($row = mysqli_fetch_array($result)){		
			echo "<br>".$row['FSE']."";
			echo ": &nbsp;". substr($row['diff'], 0,4) ." Acknowlege Average";
		}
			if (!$result) {
				printf("Error: %s\n", mysqli_error($conn));
			exit();
	}	



?>




</div>
<!--<div class="goals1">

<ul style="list-style-type:none">

	<li><a class="goal_1">FIRs Assitance Total:											<input class="box1"></a></li>
	<li><a class="goal_1">Best Practice Suggestions:					      <input class="box1"></a></li>
	<li><a class="goal_1">District Meetings Attended:        				<input class="box1"></a></li>
	<li><a class="goal_1">Dealer Contact Report Total:            	<input class="box1"></a></li>

</ul>

</div>

	<div class="fir">
 
		data

	</div>-->




</section>

</body>
</html>