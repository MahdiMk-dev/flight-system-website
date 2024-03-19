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
$response["user_id"]=$valid_token["user"];
$response["status"]="success";
    echo json_encode($response);