<?php
include('../connection.php');


$query = $mysqli->prepare('SELECT COUNT(*) AS total_flights
FROM flights');

$query->execute();
$query->store_result();
$query->bind_result($flight_count);
$query->fetch();

if($flight_count == null){
    $response['status'] = 'no flights available';
} else {
    $response['status'] = 'success';
    $response['flight_count'] = $flight_count;
}

echo json_encode($response);