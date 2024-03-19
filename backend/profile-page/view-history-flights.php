<?php
include('../connection.php');

$user_id = $_GET['user_id'];

$statusCanceled = 'canceled';
$statusComplete = 'completed';

$query = $mysqli->prepare('select reservations.id as id, reservations.status ,flights.departure_date as date from flights join reservations on flights.id = reservations.flight_id where user_id = ? and (reservations.status = ? or reservations.status = ?)');
$query->bind_param('iss', $user_id, $statusComplete, $statusCanceled);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = 'no flights';
} else {
    $query->bind_result($flight_id, $status,$date);
    $flights = [];
    while ($query->fetch()) {
        $flight =[
            'id' => $flight_id,
            'status' => $status,
            'date' => $date
        ];
    $flights[] = $flight;

    $response['status'] = "success";
    $response['flights'] = $flights;
}
}

echo json_encode($response);