<?php
include('../connection.php');

$id = $_POST['id'];
$status = $_POST['status'];

$query = $mysqli->prepare('UPDATE flights
SET status = ? WHERE id = ?');
$query->bind_param('si',$status, $id);
$query->execute();

if($query->affected_rows>0){
    $response['status'] = 'success';
    $response['message'] = 'flight status updated!';
}else{
    $response['status'] = 'error';
    $response['message'] = 'flight status was not updated!';
} 

echo json_encode($response);