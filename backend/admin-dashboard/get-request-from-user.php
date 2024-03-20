<?php
include('../connection.php');

$response = array();

$user_id = $_POST['user_id'];
$amount = $_POST['amount'];
$status = $_POST['status'];


if (isset($user_id) && isset($amount) &&  isset($status)) {
    $query = $mysqli->prepare('INSERT INTO payment_request (user_id, amount, status) VALUES (?, ?, ?)');

    $query->bind_param('iis', $user_id, $amount, $status);
    $query->execute();
    $created_id = $mysqli->insert_id;
    $response['id'] = $created_id;
    $response['status'] = 'Success';
    $response['message'] = 'Payment request was created successfully';
} else{
    $response['status'] = 'Error';
    $response['message'] = 'Missing fields required!';
};

header('Content-Type: application/json');
echo json_encode($response);