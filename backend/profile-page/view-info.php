<?php
include('../connection.php');

$user_id = $_GET['user_id'];
$query = $mysqli->prepare('select username, email, dob, passport_number, nationality, phone_number from users where id = ?');
$query->bind_param('i', $user_id);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = 'user not found';
} else {
    $query->bind_result($username, $email, $dob, $passport_number, $nationality, $phone_number);
    $query -> fetch();
    $user = array(
        'username' => $username,
        'email' => $email,
        'dob' => $dob,
        'passport_number' => $passport_number,
        'nationality' => $nationality,
        'phone_number' => $phone_number
    );
}


$response['status'] = "success";
$response['user'] = $user;

echo json_encode($response);