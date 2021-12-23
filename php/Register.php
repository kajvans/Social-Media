<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$str = file_get_contents('ConnectionInfo.json');
$json = json_decode($str);

//database info
$servername = $json->Login[4]->servername;
$username = $json->Login[4]->username;
$password = $json->Login[4]->password;
$dbname = $json->Login[4]->dbname;

//by user
$loginUser = $_POST["loginUser"];
$loginPass = $_POST["loginPass"];
$loginEmail = $_POST["loginEmail"];
$loginIp = $_POST["loginIp"];

$options = ['cost' => 10,];

//create Connection
$conn = new mysqli($servername, $username, $password, $dbname);

//check Connection
if($conn->connect_error) {
	die("Connection Failed: " . $conn->connect_error);
}

$sql = "SELECT Name FROM user WHERE Name = ?";

$statement = $conn->prepare($sql);

$statement->bind_param("s", $loginUser);

$statement->execute();
$result = $statement->get_result();

$sql2 = "SELECT email FROM user WHERE email = ?";

$statement2 = $conn->prepare($sql2);

$statement2->bind_param("s", $loginEmail);

$statement2->execute();
$result2 = $statement2->get_result();

if ($result->num_rows > 0) {
echo "username is taken";

} elseif ($result2->num_rows > 0){
	echo "email is taken";
}

else {
  $hashToken = hash('sha256', $loginPass . $loginEmail . $loginUser);
  $Identifier = hash('sha256', $loginPass . $loginEmail . $loginUser . $loginIp);
  $hash = password_hash($loginPass, PASSWORD_BCRYPT, $options);
  $date = date("Y-m-d");
  $stmt = $conn->prepare("INSERT INTO user (Name, email, password, Token, Identifier, Created, ip) VALUES (?, ?, ?, ?, ?, ?, ?)");
  $stmt->bind_param("sssssss", $loginUser, $loginEmail, $hash, $hashToken, $Identifier , $date, $loginIp);
  $stmt->execute();
  echo "creating user";

  $sql2 = "SELECT id, name, Token, Identifier FROM user WHERE name = ?";

  $statement2 = $conn->prepare($sql2);

  $statement2->bind_param("s", $loginUser);

  $statement2->execute();
  $result2 = $statement2->get_result();

  session_start();

  $sql3 = "SELECT id FROM user WHERE email = $loginEmail";
  $result3 = $conn->query($sql3);

  $_SESSION['id'] = $result3;
  $_SESSION['Identifier']   = $Identifier;
  
  $row2 = $result2->fetch_row();
  echo json_encode($row2);

$stmt->close();
}
$conn->close();

?>