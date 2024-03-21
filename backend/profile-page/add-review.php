<?php
include('../connection.php');

$booking_id = $_POST['booking_id'];
$rating = $_POST['rating'];
$review = $_POST['review'];
$user_id = $_POST['user_id'];
if (isset($booking_id)) {
    $query = $mysqli->prepare('insert into flight_reviews
                            (user_id,flight_id,rating,review) values (?,?,?,?)');

    $query->bind_param('iiis', $user_id, $booking_id, $rating,$review);
    $query->execute();

    if ($query->affected_rows > 0) {
        $response['status'] = "success";
    } else {
        $response['status'] = "failed to review";
    }
}

echo json_encode($response);