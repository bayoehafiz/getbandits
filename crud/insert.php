<?php
if($_POST){
	include('class/mysql_crud.php');
	$db = new Database();
	$db->connect();
	$name = $db->$_POST['name'];
	$email = $db->escapeString($_POST['email']); // Escape any input before insert
	$city = $db->$_POST['city'];
	$white = $db->$_POST['white'];
	$black = $db->$_POST['black'];
	$date = $db->$_POST['date'];

	$db->insert('customer',array('name'=>$name, 'email'=>$email, 'city'=>$city, 'white'=>$white, 'black'=>$black, 'date'=>$date));

	$res = $db->getResult();  
	print_r($res);
}
?>