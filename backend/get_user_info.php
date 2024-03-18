<?php
include('./connection.php');
include('jwt_functions.php'); // Include JWT functions file
require_once('./vendor/autoload.php');
$headers=apache_request_headers();

$token=validate_token_exist($headers);
if($token["message"]!='success'){
    $response['status'] = $token["message"];
    echo json_encode($response);
    exit; // Terminate the script
}
$valid_token=verifyToken($token['jwt']);
if($valid_token["message"]!="success"){
    $response['status'] = $valid_token["message"];
    echo json_encode($response);
    exit; // Terminate the script
}
$user_id=$valid_token["user"];
    $query = $mysqli->prepare('select id,dob,nationality,username,email,passport_number,phone_number
    from users
    where id=?');

    $query->bind_param('i', $user_id);
    $query->execute();
    $query->store_result();
    $query->bind_result($id, $dob, $nationality,$name,$email,$passport_number,$phone_number);
    $query->fetch();
    $num_rows = $query->num_rows();

    if ($num_rows == 0) {
        $response['status'] = "user not found";
    } else {
            $response['status'] = "success";
            $response['user_id'] = $user_id;
            $response['email'] = $email;
            $response['name'] = $name;
            $response['passport_number'] = $passport_number;
			$response['nationality'] = $nationality;
			$response['dob'] = $dob;
			$response['phone_number'] = $phone_number;


    }
    header('Content-Type: application/json');
    echo json_encode($response);
?>