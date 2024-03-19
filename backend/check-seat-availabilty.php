<?php
include('../connection.php');

// Check if user_id, flight_id, and seat_number are provided in the request
if (!isset($_POST['user_id']) || !isset($_POST['flight_id']) || !isset($_POST['seat_number'])) {
    $response['status'] = 'error';
    $response['message'] = 'User ID, flight ID, and seat number are required';
    echo json_encode($response);
    exit; // Terminate the script
}

$user_id = $_POST['user_id'];
$flight_id = $_POST['flight_id'];
$seat_number = $_POST['seat_number'];

// Check if the flight exists
$flight_query = $mysqli->prepare('SELECT id FROM flights WHERE id = ?');
$flight_query->bind_param('i', $flight_id);
$flight_query->execute();
$flight_query->store_result();

if ($flight_query->num_rows == 0) {
    $response['status'] = 'error';
    $response['message'] = 'Invalid flight ID';
    echo json_encode($response);
    exit; // Terminate the script
}

// Check if the seat is already reserved for the given flight
$reservation_query = $mysqli->prepare('SELECT id FROM reservations WHERE flight_id = ? AND seat_number = ?');
$reservation_query->bind_param('ii', $flight_id, $seat_number);
$reservation_query->execute();
$reservation_query->store_result();

if ($reservation_query->num_rows > 0) {
    $response['status'] = 'seat_taken';
    $response['message'] = 'Seat is already taken';
} else {
    // Book the seat for the user
    $insert_query = $mysqli->prepare('INSERT INTO reservations (flight_id, user_id, seat_number) VALUES (?, ?, ?)');
    $insert_query->bind_param('iii', $flight_id, $user_id, $seat_number);
    $insert_query->execute();

    if ($insert_query) {
        $response['status'] = 'success';
        $response['message'] = 'Seat booked successfully';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Failed to book the seat';
    }
}

echo json_encode($response);
?>
