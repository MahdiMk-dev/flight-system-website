<?php
include('../connection.php');

$month = $_GET['month'];
$query = $mysqli->prepare('SELECT SUM(price) AS total_price
FROM flights
WHERE MONTH(departure_date) = ?');
$query->bind_param('i', $month);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = 'no revenue in this month';
} else {
    $query->bind_result($revenue);
    $query->fetch();
    $revenueData = array(
        "revenue" => $revenue
    );
    $response['revenue'] = $revenueData;
}

$response['status'] = "success";
$response['revenue'] = $revenue;

echo json_encode($response);