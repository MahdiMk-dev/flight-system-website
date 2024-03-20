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
//var_dump($user_id);
// Check if flight_id is provided in the request
if (!isset($_GET['flight_id'])) {
    $response['status'] = 'error';
    $response['message'] = 'Flight ID is required';
    echo json_encode($response);
    exit; // Terminate the script
}
if (!isset($_GET['seat_number'])) {
    $response['status'] = 'error';
    $response['message'] = 'Flight ID is required';
    echo json_encode($response);
    exit; // Terminate the script
}
$flight_id = intval($_GET['flight_id']);
$seat_number = intval($_GET['seat_number']);
$price = intval($_GET['price']);

$query = $mysqli->prepare('SELECT * from reservations  WHERE flight_id = ? and seat_number=?');
$query->bind_param('ii', $flight_id,$seat_number);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows;
//var_dump($query);
if ($num_rows != 0) {
    $response['status'] = 'Seat not Available';
} else {
    $query2 = $mysqli->prepare('SELECT coins,is_active from users  WHERE id = ? ');
    $query2->bind_param('i', $user_id);
    $query2->execute();
    $query2->store_result();

    $num_rows2 = $query2->num_rows;
    if ($num_rows2 == 0  ) {
    $response['status'] = 'User not Found';
    }
    else{
        $query2->bind_result($coins,$status);
        $query2->fetch();
            if($coins<$price){
                $response['status'] = 'No enough Credit';
            }
            else if($status!='active'){
                $response['status'] = 'User Not Active Fill All info in your profile to start booking.';
            }
        else{
        $query3 = $mysqli->prepare('INSERT INTO reservations (flight_id, user_id , seat_number) VALUES (?, ?, ?)');
        $query3->bind_param('iii', $flight_id, $user_id, $seat_number);
        $query3->execute();
        $created_id = $mysqli->insert_id;
        $result_coins=$coins-$price;
        $query4 = $mysqli->prepare('update users set coins=?');
        $query4->bind_param('i', $result_coins);
        $query4->execute();
        $created_id = $mysqli->insert_id;
    $response['status'] = "success";
    $response['reservation_id'] = $created_id;
    }
}
}

echo json_encode($response);
?>