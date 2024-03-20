<?php
include('../connection.php');


$response = array();

$price = $_POST['price'];
$departure_airport_id = $_POST['departure_airport_id'];
$arrival_airport_id = $_POST['arrival_airport_id'];
$departure_date = $_POST['departure_date'];
$departure_time = $_POST['departure_time'];
$arrival_date = $_POST['arrival_date'];
$arrival_time = $_POST['arrival_time'];
$airplane_id = $_POST['airplane_id'];
$status = $_POST['status'];

if (isset($price) && isset($departure_airport_id) &&  isset($arrival_airport_id) && isset($departure_date) && isset($departure_time) && isset($arrival_date) && isset($arrival_time) && isset($airplane_id) && isset($status)) {
$query = $mysqli->prepare('INSERT INTO flights (price, departure_airport_id, arrival_airport_id, departure_date, departure_time, arrival_date, arrival_time, airplane_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');

$query->bind_param('iiissssis', $price, $departure_airport_id, $arrival_airport_id, $departure_date, $arrival_date, $departure_time, $arrival_time, $airplane_id, $status);

$query->execute();
$created_id = $mysqli->insert_id;
$response['id'] = $created_id;
$response['status'] = 'Success';
$response['message'] = 'Flight id was created successfully';
} else{
    $response['status'] = 'Error';
    $response['message'] = 'Missing fields required!';
};

header('Content-Type: application/json');
echo json_encode($response);