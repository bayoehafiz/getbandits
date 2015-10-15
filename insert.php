<?php
if($_POST){
	$name = $_POST['name'];
	$email = $_POST['email'];
	$city = $_POST['city'];
	$white = $_POST['white'];
	$black = $_POST['black'];
	$date = date("Y-m-d H:i:s");

	$link = mysqli_connect("localhost","getbandits_user","Hello123#","getbandits_db");
	$query = "INSERT INTO customers (`name`, `email`, `city`, `white`, `black`, `date`) VALUES ('$name', '$email', '$city', '$white', '$black', '$date')";	
	$res = mysqli_query($link, $query) or die(mysqli_error($link));

	//$res = getResult();  
	print_r($res);
}