<?php
include('../connection.php');

$query = $mysqli->prepare('SELECT COUNT(*) AS total_users
FROM users');

$query->execute();
$query->store_result();
$query->bind_result($user_count);
$query->fetch();

if($user_count == null){
    $response['status'] = 'no users available';
} else {
    $response['status'] = 'success';
    $response['user_count'] = $user_count;
}

echo json_encode($response);