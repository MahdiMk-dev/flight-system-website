<?php

include('../connection.php');

$id = $_POST['id'];
$departure_date = $_POST['departure_date'];
$departure_time = $_POST['departure_time'];
$arrival_date = $_POST['arrival_date'];
$arrival_time = $_POST['arrival_time'];

$query = $mysqli->prepare('UPDATE flights
SET departure_date = ?, departure_time =?, arrival_date = ?, arrival_time = ? WHERE id = ?');
$query->bind_param('ssssi',$departure_date, $departure_time, $arrival_date, $arrival_time, $id);
$query->execute();

if($query->affected_rows>0){
    $response['status'] = 'success';
    $response['message'] = 'Schedule updated!';
}else{
    $response['status'] = 'error';
    $response['message'] = 'Schedule was not updated!';
} 
echo json_encode($response);