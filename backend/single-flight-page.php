<?php
include('./connection.php');
include('jwt_functions.php'); // Include JWT functions file
require_once('./vendor/autoload.php');

$headers=apache_request_headers();
$token=validate_token_exist($headers);
if($token["message"]!='success'){
    $response['status'] = $token["message"];
    echo json_encode($response);
    exit; // Terminate the script
}
$valid_token=verifyToken($token['jwt']);
if($valid_token["message"]!="success"){
    $response['status'] = $valid_token["message"];
    echo json_encode($response);
    exit; // Terminate the script
}
// Check if flight_id is provided in the request
if (!isset($_GET['flight_id'])) {
    $response['status'] = 'error';
    $response['message'] = 'Flight ID is required';
    echo json_encode($response);
    exit; // Terminate the script
}

$flight_id = $_GET['flight_id'];

$query = $mysqli->prepare('SELECT flights.id as id,
    flights.price as price,
    depart_airport.name as departure_airport_id,
    arrival_airport.name as arrival_airport_id,
    departure_date,
    departure_time,
    arrival_date,
    arrival_time,
    airplane_models.name as airplane_id,
    airplane_models.capacity as capacity ,
    airlines.name as airline
    FROM `flights` inner join airplanes on airplane_id=airplanes.id inner join airplane_models on airplanes.model_id=airplane_models.id inner join airports as depart_airport on depart_airport.id=flights.departure_airport_id inner join airports as arrival_airport on arrival_airport.id=flights.arrival_airport_id inner join airlines on airlines.id=airplanes.airline_id  WHERE flights.id = ?');
$query->bind_param('i', $flight_id);
$query->execute();
$query->store_result();

$num_rows = $query->num_rows;
//var_dump($query);
if ($num_rows == 0) {
    $response['status'] = 'no_flight_found';
} else {
    $query->bind_result($id, $price, $departure_airport_id, $arrival_airport_id, $departure_date, $departure_time, $arrival_date, $arrival_time, $airplane_id,$capacity,$airline);
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
            'capacity'=>$capacity,
            'airline'=>$airline
        ];
        $flights[] = $flight;
    }

    $response['status'] = "success";
    $response['flights'] = $flights;
}

echo json_encode($response);
?>