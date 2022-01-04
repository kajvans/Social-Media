<?php

$str = file_get_contents('ConnectionInfo.json');
$json = json_decode($str);

//database info
$servername = $json->Login[0]->servername;
$username = $json->Login[0]->username;
$password = $json->Login[0]->password;
$dbname = $json->Login[0]->dbname;

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

session_start();

if( !isset($_SESSION['id'])){
    echo "Error";
}

$conn->close();
?>
