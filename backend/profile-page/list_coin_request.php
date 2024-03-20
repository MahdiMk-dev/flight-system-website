<?php
include('../connection.php');

$user_id = $_GET['user_id'];



$query = $mysqli->prepare('select id,amount,status from payment_requests where user_id=?');
$query->bind_param('i', $user_id);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = 'no requests';
} else {
    $query->bind_result($id, $amount,$status);
    $requests = [];
    while ($query->fetch()) {
        $request =[
            'id' => $id,
            'amount' => $amount,
            'status' => $status
        ];
    $requests[] = $request;

    $response['status'] = "success";
    $response['requests'] = $request;
}
}

echo json_encode($response);