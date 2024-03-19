<?php
include('../connection.php');


$query= $mysqli->prepare('SELECT SUM(f.price) AS total_revenue
FROM flights f
JOIN reservations r ON f.id = r.flight_id');

$query->execute();
$query->store_result();
$query->bind_result($revenue);
$query->fetch();

if($revenue === null) {
    $response['status'] = 'no revenue found';
} else {
    $response['status'] = 'success';
    $response['revenue'] = $revenue;
}

echo json_encode($response);