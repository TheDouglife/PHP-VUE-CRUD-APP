<?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);


// Content Type JSON
header("Content-type: application/json");

$conn = new mysqli("127.0.0.1", "goliath", "CPM2020safe", "contacts");
if ($conn->connect_error) {
	die("Database connection failed!");
}
$res = array('error' => false);



$action = 'read';

if (isset($_GET['action'])) {
	$action = $_GET['action'];
}

if ($action == 'read') {
	$result = $conn->query("SELECT * FROM `tenants`");
	$users = array();

	while ($row = $result->fetch_assoc()){
		array_push($users, $row);
	}
	$res['users'] = $users;
}

if ($action == 'create') {
	$business = $_POST['business'];
	$firstname = $_POST['firstname'];
	$lastname = $_POST['lastname'];
	$title = $_POST['title'];
	$phone = $_POST['phone'];
	$email = $_POST['email'];
	$address = $_POST['address'];
	$state = $_POST['state'];
	$city = $_POST['city'];
	$zipcode = $_POST['zipcode'];


	$result = $conn->query("INSERT INTO `tenants` (`business`, `firstname`, `lastname`, `title`, `phone`, `email`, `address`, `state`, `city`, `zipcode`) VALUES ('$business', '$firstname', '$lastname', '$title', '$phone', '$email', '$address', '$state', '$city', '$zipcode') ");
	if ($result) {
		$res['message'] = "User Added successfully";
	} else{
		$res['error'] = true;
		$res['message'] = "Insert User fail";
	}
}


if ($action == 'update') {
	$id = $_POST['id'];
	$business = $_POST['business'];
	$firstname = $_POST['firstname'];
	$lastname = $_POST['lastname'];
	$title = $_POST['title'];
	$phone = $_POST['phone'];
	$email = $_POST['email'];
	$address = $_POST['address'];
	$state = $_POST['state'];
	$city = $_POST['city'];
	$zipcode = $_POST['zipcode'];


	$result = $conn->query("UPDATE `tenants` SET `business` = '$business', `firstname` = '$firstname', `lastname` = '$lastname', `title` = '$title', `phone` = '$phone', `email` = '$email', `address` = '$address', `state` = '$state', `city` = '$city', `zipcode` = '$zipcode' WHERE `id` = '$id'");
	if ($result) {
		$res['message'] = "User Updated successfully";
	} else{
		$res['error'] = true;
		$res['message'] = "User Update failed";
	}
}


if ($action == 'delete') {
	$id = $_POST['id'];
	$business = $_POST['business'];
	$firstname = $_POST['firstname'];
	$lastname = $_POST['lastname'];
	$title = $_POST['title'];
	$phone = $_POST['phone'];
	$email = $_POST['email'];
	$address = $_POST['address'];
	$state = $_POST['state'];
	$city = $_POST['city'];
	$zipcode = $_POST['zipcode'];


	$result = $conn->query("DELETE FROM `tenants` WHERE `id` = '$id'");
	if ($result) {
		$res['message'] = "User deleted successfully";
	} else{
		$res['error'] = true;
		$res['message'] = "User delete failed";
	}
}

$conn -> close();
	// print json encoded data
echo json_encode($res);
die();


 ?>