<?php
include('./connection.php');
include('./jwt_functions.php'); // Include JWT functions file
require_once('./vendor/autoload.php');
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
$user_id=$valid_token["user"];
if (isset($_POST['rate']) && isset($_POST['review']) && isset($_POST['flight_id'])) {
        $flight_id = $_POST['flight_id'];
        $review = $_POST['review'];
        $rate = $_POST['rate'];
        $query = $mysqli->prepare('INSERT INTO flight_review (user_id,flight_id,rating,review  ) VALUES (?, ?,?,?)');
        //var_dump($mysqli);
        $query->bind_param('iiis', $user_id, $flight_id,$rate,$review);
        $query->execute();
        $created_id = $mysqli->insert_id;
        $response['id'] = $created_id;
        $response['status'] = "success";
        $response['message'] = "Review Submitted successfully";

} else {
    $response["status"] = "error";
    $response["message"] = "Missing required fields";
}

header('Content-Type: application/json');
echo json_encode($response);
?>
