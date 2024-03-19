<?php
include('../connection.php');

$query = $mysqli->prepare('SELECT SUM(price) AS total_price FROM flights');
$query->execute();
$query->store_result();
$query->bind_result($revenue);
$query->fetch();

if ($revenue === null) {
    $response['status'] = 'no revenue found';
} else {
    $response['status'] = 'success';
    $response['revenue'] = $revenue;
}

echo json_encode($response);
