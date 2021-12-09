<?php

//database info
$servername = "localhost";
$username = "Create";
$password = "oVOHy)*OE]D7/Jt]";
$dbname = "social";

//by user
$Content = $_POST["Content"];
$id = $_POST["id"];
$Postid = $_POST["Postid"];

//create Connection
$conn = new mysqli($servername, $username, $password, $dbname);

//check Connection
if($conn->connect_error) {
	die("Connection Failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("INSERT INTO comments (Post_id, user_id, Comment) VALUES (?, ?, ?)");
$stmt->bind_param("iis", $Postid, $id, $Content);
$stmt->execute();

$conn->close();

?>