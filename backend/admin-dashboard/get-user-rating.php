<?php
include('../connection.php');

$query = $mysqli->prepare('SELECT fr.rating, u.username FROM flight_reviews fr JOIN users u ON fr.user_id = u.id');
$query->execute();
$query->store_result();

$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = 'no ratings';
} else {
    $query->bind_result($rating, $username);
    $ratings = [];
    while ($query->fetch()) {
        $ratingData = [
            'rating' => $rating,
            'username' => $username
        ];
        $ratings[] = $ratingData;
    }

    $response['status'] = "success";
    $response['ratings'] = $ratings;
}

echo json_encode($response);
?>
