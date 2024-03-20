<?php
include('../connection.php');

$username = $_POST['username'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$passport = $_POST['passport'];
$nationality = $_POST['nationality'];
$dob = $_POST['dob'];
$user_id=$_POST["user_id"];
if (isset($username) && isset($email) && isset($phone) && isset($dob) && isset($nationality) && isset($passport)) {
    $check_email = $mysqli->prepare('SELECT email FROM users WHERE email = ? and id<> ?');

    $check_email->bind_param('si', $email,$user_id);
    $check_email->execute();
    $check_email->store_result();
    $email_exists = $check_email->num_rows();

    if ($email_exists == 0) {
    $query = $mysqli->prepare('update users
                            set username=?, phone_number =?, email=?,dob=?
                            ,nationality=?,passport_number=?,is_Active="active" where id=?');
 
    $query->bind_param('sisssii', $username, $phone, $email, $dob,$nationality,$passport, $user_id);
    $query->execute();

    if ($query->affected_rows > 0) {
        $response['status'] = "succcess";
    } else {
        $response['status'] = "failed to update";
    }
}
else $response["status"]="email already exist";
} else {
    $response['status'] = "missing required info!";
}

echo json_encode($response);