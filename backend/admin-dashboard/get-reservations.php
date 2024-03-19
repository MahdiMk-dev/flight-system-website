<?php
include('../connection.php');

$month = $_GET['month'];
$query = $mysqli->prepare('SELECT r.id, r.flight_id, r.user_id
FROM reservations r
JOIN flights f ON r.flight_id = f.id
WHERE MONTH(f.departure_date) = ?');
$query->bind_param('i', $month);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

$reservations = array();
if($num_rows == 0) {
    $response['status'] = 'month not available';
} else {
    $query->bind_result($reservation_id, $flight_id, $user_id);
    while($query->fetch()){
        $reservations[] = array(
            'r.id' => $reservation_id,
            'r.flight_id' => $flight_id,
            'r.user_id' => $user_id
        );
    };
    
}

$response['status'] = 'success';
$response['reservations'] = $reservations;

echo json_encode($response);
