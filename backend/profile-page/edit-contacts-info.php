<?php
include('../connection.php');

$user_id = $_POST['user_id'];
$name = $_POST['name'];
$phone_number = $_POST['phone_number'];
$email = $_POST['email'];
$relation = $_POST['relation'];

if (isset($name) && isset($email) && isset($phone_number) && isset($relation)) {
    $query = $mysqli->prepare('update emergency_contacts
                            set name=?, phone_number =?, email=?,relation=?
                            where user_id=?');
    $query->bind_param('sissi', $name, $phone_number, $email, $relation, $user_id);
    $query->execute();

    if ($query->affected_rows > 0) {
        $response['status'] = "contact info updated";
    } else {
        $response['status'] = "failed to update";
    }
} else {
    $response['status'] = "missing required info!";
}

echo json_encode($response);