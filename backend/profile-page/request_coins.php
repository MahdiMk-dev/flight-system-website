<?php
/*include('../connection.php');
include('../jwt_functions.php'); // Include JWT functions file
require_once('../vendor/autoload.php');


$headers=apache_request_headers();
$token=validate_token_exist($headers);
$response = array(); // Initialize response array
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
$user_id=$valid_token["user"];*/
$user_id=$_GET['user_id']; 
if (isset($_POST['amount']) ) {
        $amount = $POST['amount'];
        $query = $mysqli->prepare('INSERT INTO payment_requests (user_id, amount ) VALUES (?, ?)');
        $query->bind_param('ii', $user_id, $amount);
        $query->execute();
        $created_id = $mysqli->insert_id;
        $response['id'] = $created_id;
        $response['status'] = "success";
        $response['message'] = "Amount Requested successfully";

} else {
    $response["status"] = "error";
    $response["message"] = "Missing required fields";
}

header('Content-Type: application/json');
echo json_encode($response);
?>
