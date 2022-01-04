<?php

$str = file_get_contents('ConnectionInfo.json');
$json = json_decode($str);

//database info
$servername = $json->Login[3]->servername;
$username = $json->Login[3]->username;
$password = $json->Login[3]->password;
$dbname = $json->Login[3]->dbname;

//by user
$Token = $_POST["Token"];
$loginip = $_POST["loginip"];

//create Connection
$conn = new mysqli($servername, $username, $password, $dbname);

//check Connection
if($conn->connect_error) {
	die("Connection Failed: " . $conn->connect_error);
}

$sql = "SELECT Token FROM user WHERE Token = ?";

$statement = $conn->prepare($sql);

$statement->bind_param("s", $Token);

$statement->execute();
$result = $statement->get_result();

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    session_start();
    $sql2 = "SELECT id, Identifier, name FROM user WHERE Token = ?";

    $statement2 = $conn->prepare($sql2);

    $statement2->bind_param("s", $Token);

    $statement2->execute();
    $result2 = $statement2->get_result();
    
    $row = $result2->fetch_row();
    $_SESSION['id'] = $row[0];
    $_SESSION['Identifier'] = $row[1];
    echo json_encode($row[2]);

    $stmtip = $conn->prepare("UPDATE user SET ip=? WHERE Token=?");
		$stmtip->bind_param('ss', $loginip, $Token);
		$stmtip->execute();

  }
} else {
    echo "Error";
}



$conn->close();

?>