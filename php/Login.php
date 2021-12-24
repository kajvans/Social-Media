<?php

$str = file_get_contents('ConnectionInfo.json');
$json = json_decode($str);

//database info
$servername = $json->Login[3]->servername;
$username = $json->Login[3]->username;
$password = $json->Login[3]->password;
$dbname = $json->Login[3]->dbname;

//by user
$loginUser = $_POST["loginUser"];
$loginPass = $_POST["loginPass"];
$loginip = $_POST["loginip"];

//create Connection
$conn = new mysqli($servername, $username, $password, $dbname);

//check Connection
if($conn->connect_error) {
	die("Connection Failed: " . $conn->connect_error);
}

$sql = "SELECT password FROM user WHERE name = ?";

$statement = $conn->prepare($sql);

$statement->bind_param("s", $loginUser);

$statement->execute();
$result = $statement->get_result();

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    if(password_verify($loginPass, $row["password"])){

		session_start();

		$sql2 = "SELECT id, Token, Identifier FROM user WHERE name = ?";

		$statement2 = $conn->prepare($sql2);
	
		$statement2->bind_param("s", $loginUser);
	
		$statement2->execute();
		$result2 = $statement2->get_result();
		
		$row2 = $result2->fetch_row();

		$_SESSION['id'] = $row2[0];
		$_SESSION['Identifier'] = $row2[2];

		echo json_encode($row2);

		$stmtip = $conn->prepare("UPDATE user SET ip=? WHERE name=?");
		$stmtip->bind_param('ss', $loginip, $loginUser);
		$stmtip->execute();
	}

	else{
		echo "wrong password";
	}
  }
} else {
	$sql = "SELECT password FROM user WHERE email = ?";

	$statement = $conn->prepare($sql);

	$statement->bind_param("s", $loginUser);

	$statement->execute();
	$result = $statement->get_result();

	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
		  if(password_verify($loginPass, $row["password"])){

			session_start();

			echo "Login Succes";

			$sql2 = "SELECT id, Token, Identifier FROM user WHERE name = ?";

			$statement2 = $conn->prepare($sql2);
		
			$statement2->bind_param("s", $loginUser);
		
			$statement2->execute();
			$result2 = $statement2->get_result();
			
			$row2 = $result2->fetch_row();

			$_SESSION['id'] = $row2[0];
			$_SESSION['Identifier'] = $row2[2];
			echo json_encode($row2);

			$stmtip2 = $conn->prepare("UPDATE user SET ip=? WHERE email=?");
			$stmtip2->bind_param('ss', $loginip, $loginUser);
			$stmtip2->execute();

			echo "test" + $_SESSION;
		  }
	  
		  else{
			  echo "Error";
		  }
		}
	}

	else{
		echo "Error";
	}
}



$conn->close();

?>