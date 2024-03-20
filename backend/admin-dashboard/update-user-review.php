<?php
include('../connection.php');

$review = $_POST['review'];
$status = $_POST['status'];

$query = $mysqli->prepare('UPDATE flights
SET status = ? WHERE review = ?');
$query->bind_param('si',$status, $review);
$query->execute();

if($query->affected_rows>0){
    $response['status'] = 'success';
    $response['message'] = 'flight status updated!';
}else{
    $response['status'] = 'error';
    $response['message'] = 'flight status was not updated!';
} 

echo json_encode($response);