<?php

//database info
$servername = "localhost";
$username = "Create";
$password = "oVOHy)*OE]D7/Jt]";
$dbname = "social";

//by user
$Content = $_POST["Content"];
$id = $_POST["id"];

//create Connection
$conn = new mysqli($servername, $username, $password, $dbname);

//check Connection
if($conn->connect_error) {
	die("Connection Failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("INSERT INTO post (user_id, content) VALUES (?, ?)");
$stmt->bind_param("is", $id , $Content);
$stmt->execute();

$conn->close();

?>