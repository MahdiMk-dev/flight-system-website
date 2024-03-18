<?php
include('./connection.php');
include('jwt_functions.php'); // Include JWT functions file
require_once('./vendor/autoload.php');
$headers=apache_request_headers();

$token=validate_token_exist($headers);
$valid_token=verifyToken($token);
if($valid_token["message"]!="success"){
    $response['status'] = $valid_token["message"];
    echo json_encode($response);
    exit; // Terminate the script
}

// Check if flight_id is provided in the request
if (!isset($_GET['flight_id'])) {
    $response['status'] = 'error';
    $response['message'] = 'Flight ID is required';
    echo json_encode($response);
    exit; // Terminate the script
}

$flight_id = $_GET['flight_id'];

$query = $mysqli->prepare('SELECT * FROM flights WHERE id = ?');
$query->bind_param('i', $flight_id);
$query->execute();
$query->store_result();

$num_rows = $query->num_rows;

if ($num_rows == 0) {
    $response['status'] = 'no_flight_found';
} else {
    $query->bind_result($id, $price, $departure_airport_id, $arrival_airport_id, $departure_date, $departure_time, $arrival_date, $arrival_time, $airplane_id);
    $flights = [];

    while ($query->fetch()) {
        $flight = [
            'id' => $id,
            'price' => $price,
            'departure_airport_id' => $departure_airport_id,
            'arrival_airport_id' => $arrival_airport_id,
            'departure_date' => $departure_date,
            'departure_time' => $departure_time,
            'arrival_date' => $arrival_date,
            'arrival_time' => $arrival_time,
            'airplane_id' => $airplane_id
        ];
        $flights[] = $flight;
    }

    $response['status'] = "success";
    $response['flights'] = $flights;
}

echo json_encode($response);
?>