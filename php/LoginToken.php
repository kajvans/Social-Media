<?php

//database info
$servername = "localhost";
$username = "login";
$password = "9c84B83UPDeubBIq";
$dbname = "social";

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
    echo "Login Succes";
    $sql2 = "SELECT id, name FROM user WHERE Token = ?";

    $statement2 = $conn->prepare($sql2);

    $statement2->bind_param("s", $Token);

    $statement2->execute();
    $result2 = $statement2->get_result();
    
    $row = $result2->fetch_row();
    echo json_encode($row);

    $stmtip = $conn->prepare("UPDATE user SET ip=? WHERE Token=?");
		$stmtip->bind_param('ss', $loginip, $Token);
		$stmtip->execute();

  }
} else {
    echo "not exist";
}



$conn->close();

?>