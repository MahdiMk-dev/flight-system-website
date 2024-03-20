<?php
include('../connection.php');

$query = $mysqli->prepare('SELECT fr.review, u.username FROM flight_reviews fr JOIN users u ON fr.user_id = u.id');
$query->execute();
$query->store_result();

$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = 'no reviews';
} else {
    $query->bind_result($review, $username);
    $reviews = [];
    while ($query->fetch()) {
        $reviewData = [
            'review' => $review,
            'username' => $username
        ];
        $reviews[] = $reviewData;
    }

    $response['status'] = "success";
    $response['reviews'] = $reviews;
}

echo json_encode($response);
?>
