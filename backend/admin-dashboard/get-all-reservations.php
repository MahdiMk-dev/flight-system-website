<?php
include('../connection.php');

$query = $mysqli->prepare('SELECT reservations.id, reservations.flight_id,seat_number, users.username, users.email FROM reservations
                join users on reservations.user_id = users.id
                join flights on flights.id = reservations.flight_id'
                );
$query->execute();
$query->store_result();

$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = 'no reservations';
} else {
    $query->bind_result($id, $flight_id, $seat_number, $username, $email);

    $reservations = [];
    while ($query->fetch()) {
        $reservation = [
            'id' => $id,
            'flight_id' => $flight_id,
            'seat_number' => $seat_number,
            'username' => $username,
            'email' => $email
        ];
        $reservations[] = $reservation;
    }

    $response['status'] = "success";
    $response['reservations'] = $reservations;
}

echo json_encode($response);
?>