<?php
include('./connection.php');
include('jwt_functions.php'); // Include JWT functions file
require_once('./vendor/autoload.php');


$where_condition="";

// Check if flight_id is provided in the request
if (isset($_POST) && count($_POST)!=0 ) {
    $where_condition=" where ";
    foreach ($_POST as $key => $value) {
    $where_condition.=" ".$key."='".$value."' and ";
}
$lastOccurrence = strrpos($where_condition, "and");

if ($lastOccurrence !== false) {
    // Remove "and" from the end of the string
    $where_condition = substr($where_condition, 0, $lastOccurrence) . substr($where_condition, $lastOccurrence + strlen("and"));
}

}



$sql = 'SELECT flights.id as id,
    flights.price as price,
    depart_airport.name as departure_airport_id,
    arrival_airport.name as arrival_airport_id,
    departure_date,
    departure_time,
    arrival_date,
    arrival_time,
    airplane_models.name as airplane_id,
    airplane_models.capacity as capacity ,
    avg(rating)as average_rating,
    count(reservations.id) as passengers,
    airlines.name as airline
    FROM `flights` inner join airplanes on airplane_id=airplanes.id inner join airplane_models on airplanes.model_id=airplane_models.id inner join airports as depart_airport on depart_airport.id=flights.departure_airport_id inner join airports as arrival_airport on arrival_airport.id=flights.arrival_airport_id inner join airlines on airlines.id=airplanes.airline_id 
    left join flight_review on flight_review.id=flights.id 
    left join reservations on reservations.flight_id=flights.id '.$where_condition."group by id,
        price,
        departure_airport_id,
        arrival_airport_id,
        departure_date,
        departure_time,
        arrival_date,
        arrival_time,
        airplane_id,
        capacity,airline";

$result = $mysqli->query($sql);

// Check if the query was successful
if ($result) {
    $flights = array();
    // Fetch data row by row
    while ($row = $result->fetch_assoc()) {
        $flight = [
            'id' => $row["id"],
            'price' => $row["price"],
            'departure_airport_id' => $row["departure_airport_id"],
            'arrival_airport_id' => $row["arrival_airport_id"],
            'departure_date' => $row["departure_date"],
            'departure_time' => $row["departure_time"],
            'arrival_date' => $row["arrival_date"],
            'arrival_time' => $row["arrival_time"],
            'airplane_id' => $row["airplane_id"],
            'capacity'=>$row["capacity"],
            'airline'=>$row["airline"],
            'average_rating'=>$row["average_rating"],
            'passengers'=>$row["passengers"]
        ];
        $flights[] = $flight;
    }

    $response['status'] = "success";
    $response['flights'] = $flights;
}
else $response['status'] = "No Flights";



//ads and average rating

$sql="SELECT 

    avg(rating)as average_rating,
    airlines.name as airline
    FROM `flights` inner join airplanes on airplane_id=airplanes.id inner join airplane_models on airplanes.model_id=airplane_models.id inner join airports as depart_airport on depart_airport.id=flights.departure_airport_id inner join airports as arrival_airport on arrival_airport.id=flights.arrival_airport_id inner join airlines on airlines.id=airplanes.airline_id 
    inner join flight_review on flight_review.id=flights.id
    group by 
airline order by average_rating desc ";
$result = $mysqli->query($sql);

// Check if the query was successful
if ($result) {
    $ads = [];
    // Fetch data row by row
    $row = $result->fetch_assoc(); 
    $sql2="SELECT flights.id as id,
    flights.price as price,
    depart_airport.name as departure_airport_id,
    arrival_airport.name as arrival_airport_id,
    departure_date,
    departure_time,
    arrival_date,
    arrival_time,
    airplane_models.name as airplane_id,
    airplane_models.capacity as capacity ,
    avg(rating)as average_rating,
    count(reservations.id) as passengers,
    airlines.name as airline
    FROM `flights` inner join airplanes on airplane_id=airplanes.id inner join airplane_models on airplanes.model_id=airplane_models.id inner join airports as depart_airport on depart_airport.id=flights.departure_airport_id inner join airports as arrival_airport on arrival_airport.id=flights.arrival_airport_id inner join airlines on airlines.id=airplanes.airline_id 
    left join flight_review on flight_review.id=flights.id 
    left join reservations on reservations.flight_id=flights.id 
    where airlines.name='".$row["airline"]."' and flights.status='Pending'
    group by id,
        price,
        departure_airport_id,
        arrival_airport_id,
        departure_date,
        departure_time,
        arrival_date,
        arrival_time,
        airplane_id,
        capacity,airline limit 3";

    $result2 = $mysqli->query($sql2);
        while ($row2 = $result2->fetch_assoc()) {

        $ad = [
            'id' => $row2["id"],
            'price' => $row2["price"],
            'departure_airport_id' => $row2["departure_airport_id"],
            'arrival_airport_id' => $row2["arrival_airport_id"],
            'departure_date' => $row2["departure_date"],
            'departure_time' => $row2["departure_time"],
            'arrival_date' => $row2["arrival_date"],
            'arrival_time' => $row2["arrival_time"],
            'airplane_id' => $row2["airplane_id"],
            'capacity'=>$row2["capacity"],
            'airline'=>$row["airline"],
            'average_rating'=>$row2["average_rating"],
            'passengers'=>$row2["passengers"]
        ];
        $ads[] = $ad;
    }

    $response['ads'] = $ads;
    }


echo json_encode($response);
?>