<?php
include('../connection.php');


$response = array();

$id = $_POST['id'];
$price = $_POST['price'];
$departure_airport_id = $_POST['departure_airport_id'];
$arrival_airport_id = $_POST['arrival_airport_id'];
$departure_date = $_POST['departure_date'];
$departure_time = $_POST['departure_time'];
$arrival_date = $_POST['arrival_date'];
$arrival_time = $_POST['arrival_time'];
$airplane_id = $_POST['airplane_id'];

// if (isset($dob) && isset($dob) &&  isset($dob) && isset($dob) && isset($dob) && isset($dob) && isset($dob) && isset($dob)) {
//     $query = $mysqli->prepare('')
// }
