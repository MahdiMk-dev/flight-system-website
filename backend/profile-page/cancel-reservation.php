<?php

include('../connection.php');

$user_id = $_POST['user_id'];
$booking_id = $_POST['booking_id'];
$response;

if (isset($user_id) && isset($booking_id)) {
    $query = $mysqli->prepare('update reservations
                            set status=?
                            where id=?');
    $status = 'canceled';
    $query->bind_param('si', $status, $booking_id);
    $query->execute();

    if ($query->affected_rows > 0) {
        $response['status'] = "reservation canceled";
    } else {
        $response['status'] = "failed to cancel";
    }
}

echo json_encode($response);