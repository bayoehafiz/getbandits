<?php
$mysqli_connection = new MySQLi('localhost', 'getbandits_user', 'Hello123#', 'getbandits_db');
if ($mysqli_connection->connect_error) {
   echo "Not connected, error: " . $mysqli_connection->connect_error;
}
else {
   echo "Connected.";
}
?>