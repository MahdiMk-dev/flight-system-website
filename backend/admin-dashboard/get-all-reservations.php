<?php
include('../connection.php');

$query = $mysqli->prepare('SELECT * FROM reservations');
$query->execute();
$query->store_result();

$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = 'no reservations';
} else {
    $query->bind_result($id, $flight_id, $user_id, $seat_number);

    $reservations = [];
    while ($query->fetch()) {
        $reservation = [
            'id' => $id,
            'flight_id' => $flight_id,
            'user_id' => $user_id,
            'seat_number' => $seat_number,
        ];
        $reservations[] = $reservation;
    }

    $response['status'] = "success";
    $response['reservations'] = $reservations;
}

echo json_encode($response);
?>