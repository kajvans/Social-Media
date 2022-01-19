<?php

$str = file_get_contents('ConnectionInfo.json');
$json = json_decode($str);

//database info
$servername = $json->Login[1]->servername;
$username = $json->Login[1]->username;
$password = $json->Login[1]->password;
$dbname = $json->Login[1]->dbname;

session_start();

//by user
$Content = $_POST["Content"];
$id = $_SESSION['id'];

//create Connection
$conn = new mysqli($servername, $username, $password, $dbname);

//check Connection
if($conn->connect_error) {
	die("Connection Failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("INSERT INTO post (user_id, content) VALUES (?, ?)");
$stmt->bind_param("is", $_SESSION['id'] , $Content);
$stmt->execute();

$sql = "SELECT user.name,user.id AS user, post.id, post.content, post.likes, post.dislikes, post.comments, 
FLOOR(TIME_TO_SEC(TIMEDIFF(CURRENT_TIMESTAMP, post.created)) / 60)  AS created
FROM user INNER JOIN post ON post.user_id = user.id WHERE user.id = $_SESSION[id] ORDER BY post.id DESC LIMIT 1";

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