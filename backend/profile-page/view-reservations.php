<?php
include('../connection.php');

$user_id = $_GET['user_id'];

$statusUp = 'upcoming';

$query = $mysqli->prepare('select reservations.id, departure_date, status from flights join reservations on flights.id = reservations.flight_id where user_id = ? and status = ?');
$query->bind_param('is', $user_id, $statusUp);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

$response = []; // Initialize response array

if ($num_rows == 0) {
    $response['status'] = 'no bookings';
} else {
    $query->bind_result($booking_id, $date, $statusBK);
    $bookings = [];
    while ($query->fetch()) {
        $booking = [
            'booking_id' => $booking_id,
            'date' => $date,
            'statusBooking' => $statusBK
        ];
        $bookings[] = $booking;
    }

    $response['status'] = "success";
    $response['flights'] = $bookings;
}

header('Content-Type: application/json'); // Set response header to JSON
echo json_encode($response); // Output JSON response
