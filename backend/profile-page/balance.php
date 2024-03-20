<?php
include("../connection.php");

$user_id = $_GET['user_id'];
$query = $mysqli->prepare('select coins from users where user_id = ?');
$query->bind_param('i', $user_id);
$query->execute();
$query->store_result(); 
$query->bind_result($coins);
    $balance = $coins;


    $response['status'] = "success";
    $response['coins'] = $balance;
