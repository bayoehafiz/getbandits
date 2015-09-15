<?
$mysqli_connection = new MySQLi('localhost', 'getbandituser', 'Hello123#', 'getbandits');
if ($mysqli_connection->connect_error) {
   echo "Not connected, error: " . $mysqli_connection->connect_error;
}
else {
   echo "Connected.";
}
?>