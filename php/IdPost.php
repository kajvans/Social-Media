<?php

$str = file_get_contents('ConnectionInfo.json');
$json = json_decode($str);

//database info
$servername = $json->Login[0]->servername;
$username = $json->Login[0]->username;
$password = $json->Login[0]->password;
$dbname = $json->Login[0]->dbname;

$Id = $_POST["Id"];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT user.name,user.id AS user, post.id, post.content, post.likes, post.dislikes, post.comments, 
FLOOR(TIME_TO_SEC(TIMEDIFF(CURRENT_TIMESTAMP, post.created)) / 60)  AS created
FROM user INNER JOIN post ON post.user_id = user.id WHERE post.id = $Id";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
	$rows = array();
	while($row = $result->fetch_assoc()){
		$rows[] = $row;
	}
	echo json_encode($rows);

} else {
  echo "Error";
}
$conn->close();
?>
