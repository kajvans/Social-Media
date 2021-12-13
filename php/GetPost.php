<?php

$servername = "localhost";
$username = "ProductData";
$password = "zand22";
$dbname = "social";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT user.name, post.id, post.content, post.likes, post.dislikes, post.created FROM user INNER JOIN post ON post.user_id = user.id ORDER BY created DESC LIMIT 100";

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
