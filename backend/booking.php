<?php
include('../connection.php');

// Check if user_id and flight_id are provided in the request
if (!isset($_POST['user_id']) || !isset($_POST['flight_id'])) {
    $response['status'] = 'error';
    $response['message'] = 'Both user ID and flight ID are required';
    echo json_encode($response);
    exit; // Terminate the script
}

$user_id = $_POST['user_id'];
$flight_id = $_POST['flight_id'];

// Check if the user and flight exist
$user_query = $mysqli->prepare('SELECT id FROM users WHERE id = ?');
$user_query->bind_param('i', $user_id);
$user_query->execute();
$user_query->store_result();

$flight_query = $mysqli->prepare('SELECT id FROM flights WHERE id = ?');
$flight_query->bind_param('i', $flight_id);
$flight_query->execute();
$flight_query->store_result();

if ($user_query->num_rows == 0 || $flight_query->num_rows == 0) {
    $response['status'] = 'error';
    $response['message'] = 'Invalid user ID or flight ID';
    echo json_encode($response);
    exit; // Terminate the script
}

// Insert reservation into the database
$insert_query = $mysqli->prepare('INSERT INTO reservations (flight_id, user_id) VALUES (?, ?)');
$insert_query->bind_param('ii', $flight_id, $user_id);
$insert_query->execute();

if ($insert_query) {
    $response['status'] = 'success';
    $response['message'] = 'Booking successful';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to book the flight';
}

echo json_encode($response);
?>
