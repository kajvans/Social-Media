<?php

$str = file_get_contents('ConnectionInfo.json');
$json = json_decode($str);

//database info
$servername = $json->Login[0]->servername;
$username = $json->Login[0]->username;
$password = $json->Login[0]->password;
$dbname = $json->Login[0]->dbname;

$User = $_POST["User"];

session_start();

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$getid = "SELECT id FROM user WHERE name = '$User'";

$id = mysqli_query($conn, $getid);
$id = mysqli_fetch_assoc($id);
$id = $id['id'];

$sql = "SELECT post.id, post.content, post.likes, post.dislikes, post.comments, 
FLOOR(TIME_TO_SEC(TIMEDIFF(CURRENT_TIMESTAMP, post.created)) / 60)  AS created
FROM user INNER JOIN post ON post.user_id = $id WHERE user.id = $id ORDER BY post.created DESC LIMIT 100";

$sql2 = "SELECT friends.friend_id FROM user INNER JOIN friends ON friends.user_id = $id WHERE user.id = $id";
$sql3 = "SELECT user.name, user.id AS user, user.about, user.created AS joined FROM user WHERE user.id = $id";
$sql4 = "SELECT friends.user_id FROM friends WHERE friends.friend_id = $id";

$result = $conn->query($sql3);
$result2 = $conn->query($sql2);
$result3 = $conn->query($sql);
$result4 = $conn->query($sql4);

if ($result->num_rows > 0) {
	$row = array();
	$row2 = array();
	$row3 = array();
	$row4 = array();
	while($row = $result->fetch_assoc()){
		$rows[] = $row;
	}
	while($row2 = $result2->fetch_assoc()){
		$rows2[] = $row2;
	}
	if ($result3->num_rows > 0) {
		while($row3 = $result3->fetch_assoc()){
			$rows3[] = $row3;
		}
	}
	if ($result4->num_rows > 0) {
		while($row4 = $result4->fetch_assoc()){
			$rows4[] = $row4;
		}
	}
	echo json_encode($rows);
	echo "/";
	echo json_encode($rows2);
	echo "/";
	echo json_encode($rows3);
	echo "/";
	echo json_encode($rows4);
} else {
  echo "Error";
}
$conn->close();
?>
