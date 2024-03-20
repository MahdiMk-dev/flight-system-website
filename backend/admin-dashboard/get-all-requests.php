<?php
include('../connection.php');

$query = $mysqli->prepare('SELECT * FROM payment_requests');
$query->execute();
$query->store_result();

$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = 'no payment_requests';
} else {
    $query->bind_result($id, $user_id, $amount, $status);

    $payment_requests = [];
    while ($query->fetch()) {
        $payment = [
            'id' => $id,
            'user_id' => $user_id,
            'amount' => $amount,
            'status' => $status,
        ];
        $payment_requests[] = $payment;
    }

    $response['status'] = "success";
    $response['payment_requests'] = $payment_requests;
}

echo json_encode($response);
?>