<?php
include('../connection.php');

$query = $mysqli->prepare('SELECT * FROM flights');
$query->execute();
$query->store_result();

$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = 'no flights';
} else {
    $query->bind_result($id, $price, $departure_airport_id, $arrival_airport_id, $departure_date, $departure_time, $arrival_date, $arrival_time, $airplane_id, $status);

    $flights = [];
    while ($query->fetch()) {
        $flight = [
            'id' => $id,
            'price' => $price,
            'departure_airport_id' => $departure_airport_id,
            'arrival_airport_id' => $arrival_airport_id,
            'departure_date' => $departure_date,
            'departure_time' => $departure_time,
            'arrival_date' => $arrival_date,
            'arrival_time' => $arrival_time,
            'airplane_id' => $airplane_id,
            'status' => $status
        ];
        $flights[] = $flight;
    }

    $response['status'] = "success";
    $response['flights'] = $flights;
}

echo json_encode($response);
?>
