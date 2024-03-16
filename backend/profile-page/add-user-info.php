<?php
include('../connection.php');

$user_id = $_POST['user_id'];
$dob = $_POST['dob'];
$nationality = $_POST['nationality'];
$passport_number = $_POST['passport_number'];
$phone_number = $_POST['phone_number'];

if (isset($dob) && isset($nationality) && isset($passport_number) && isset($phone_number)) {
    $query = $mysqli->prepare('update users
                            set dob=?, nationality =?, passport_number=?,phone_number=?
                            where id=?');
    $query->bind_param('ssiii', $dob, $nationality, $passport_number, $phone_number, $user_id);
    $query->execute();

    if ($query->affected_rows > 0) {
        $response['status'] = "user info added";
    } else {
        $response['status'] = "failed to add user info";
    }
} else {
    $response['status'] = "missing required info!";
}

echo json_encode($response);