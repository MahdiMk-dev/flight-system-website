<?php
include("../connection.php");

$user_id = $_GET['user_id'];
$query = $mysqli->prepare('select coins from users where id = ?');

$query->bind_param('i', $user_id);

$query->execute();
$query->store_result(); 
$query->bind_result($coins);
$query->fetch();
    $balance = $coins;
if($balance==NULL)
    $balance=0;

    $response['status'] = "success";
    $response['coins'] = $balance;

echo json_encode($response);