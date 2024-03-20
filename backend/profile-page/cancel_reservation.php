<?php
include('../connection.php');

$user_id = $_POST['user_id'];
$booking_id = $_POST['booking_id'];

if (isset($user_id) && isset($booking_id)) {
    $query = $mysqli->prepare('update reservations
                            set status=?
                            where id=? and user_id=?');
    $status = 'canceled';
    $query->bind_param('sii', $status, $booking_id, $user_id);
    $query->execute();

    if ($query->affected_rows > 0) {
        $response['status'] = "success";
    } else {
        $response['status'] = "failed to cancel";
    }
}

echo json_encode($response);