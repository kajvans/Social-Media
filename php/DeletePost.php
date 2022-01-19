<?php

$str = file_get_contents('ConnectionInfo.json');
$json = json_decode($str);

session_start();

$Id = $_POST["Id"];

$servername = $json->Login[2]->servername;
$username = $json->Login[2]->username;
$password = $json->Login[2]->password;
$dbname = $json->Login[2]->dbname;

$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "DELETE FROM likes WHERE Post_id = $Id";
$sql2 = "DELETE FROM dislikes WHERE Post_id = $Id";
$sql3 = "DELETE FROM comments WHERE Post_id = $Id";
$sql4 = "DELETE FROM post WHERE post.id = $Id AND user_id = $_SESSION[id];";

$statement = $conn->prepare($sql);
$statement->execute();
$statement = $conn->prepare($sql2);
$statement->execute();
$statement = $conn->prepare($sql3);
$statement->execute();
$statement = $conn->prepare($sql4);
$statement->execute();
$result = $statement->get_result(); 

$conn->close();
?>