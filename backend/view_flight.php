<?php
include('./connection.php');
include('jwt_functions.php'); // Include JWT functions file
require_once('./vendor/autoload.php');


$where_condition="";

// Check if flight_id is provided in the request
if (isset($_GET["filter"]) && count($_GET)!=0 && $_GET["filter"]!="") {
    $where_condition=" where ";
    $where_condition.=$_GET["filter"];
}
$lastOccurrence = strrpos($where_condition, "and");

if ($lastOccurrence !== false) {
    // Remove "and" from the end of the string
    $where_condition = substr($where_condition, 0, $lastOccurrence) . substr($where_condition, $lastOccurrence + strlen("and"));
}




$sql = 'SELECT flights.id as id,
flights.status as status,
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
    left join flight_reviews on flight_reviews.id=flights.id 
    left join reservations on reservations.flight_id=flights.id  '.$where_condition." group by id,
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
            'passengers'=>$row["passengers"],
            'status' => $row["status"],
        ];
        $flights[] = $flight;
    }

    $response['status_flights'] = "success";
    $response['flights'] = $flights;
}
else $response['status_flights'] = "No Flights";



//ads and average rating

$sql="SELECT 

    avg(rating)as average_rating,
    airlines.name as airline
    FROM `flights` inner join airplanes on airplane_id=airplanes.id inner join airplane_models on airplanes.model_id=airplane_models.id inner join airports as depart_airport on depart_airport.id=flights.departure_airport_id inner join airports as arrival_airport on arrival_airport.id=flights.arrival_airport_id inner join airlines on airlines.id=airplanes.airline_id 
    inner join flight_reviews on flight_reviews.id=flights.id
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
    left join flight_reviews on flight_reviews.id=flights.id 
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
    $response['ads_status'] = "success";
    }
    else
 $response['ads_status'] = "No Ads";




$sql5 = 'SELECT flights.id as id,
flights.status as status,
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
    left join flight_reviews on flight_reviews.id=flights.id 
    left join reservations on reservations.flight_id=flights.id where departure_date=CURDATE() group by id,
        price,
        departure_airport_id,
        arrival_airport_id,
        departure_date,
        departure_time,
        arrival_date,
        arrival_time,
        airplane_id,
        capacity,airline';
     

$result5 = $mysqli->query($sql5);

// Check if the query was successful
if ($result5) {
    $today = array();
    // Fetch data row by row
    while ($row5 = $result5->fetch_assoc()) {
        $t = [
            'id' => $row5["id"],
            'price' => $row5["price"],
            'departure_airport_id' => $row5["departure_airport_id"],
            'arrival_airport_id' => $row5["arrival_airport_id"],
            'departure_date' => $row5["departure_date"],
            'departure_time' => $row5["departure_time"],
            'arrival_date' => $row5["arrival_date"],
            'arrival_time' => $row5["arrival_time"],
            'airplane_id' => $row5["airplane_id"],
            'capacity'=>$row5["capacity"],
            'airline'=>$row5["airline"],
            'average_rating'=>$row5["average_rating"],
            'passengers'=>$row5["passengers"],
            'status' => $row5["status"],
        ];
        $today[] = $t;
    }

    $response['status_today'] = "success";
    $response['today'] = $today;
}
else $response['status_today'] = "No Flights";

echo json_encode($response);
?>