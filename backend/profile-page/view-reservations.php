<?php
include('../connection.php');

$user_id = $_GET['user_id'];

$statusUp = 'upcoming';

$query = $mysqli->prepare('select flight_id, departure_date from flights join reservations on flights.id = reservations.flight_id where user_id = ? and status = ?');
$query->bind_param('is', $user_id, $statusUp);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = 'no bookings';
} else {
    $query->bind_result($flight_id, $date);
    $bookings = [];
    while ($query->fetch()) {
        $booking =[
            'flight_id' => $flight_id,
            'date' => $date
        ];
    $bookings[] = $booking;

    $response['status'] = "success";
    $response['flights'] = $bookings;
}
}

echo json_encode($response);