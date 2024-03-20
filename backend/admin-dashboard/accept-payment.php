<?php
include('../connection.php');

$user_id = $_POST['user_id'];
$amount = $_POST['amount'];
$status = $_POST['status'];

if (isset($user_id) && isset($amount) && isset($status)) {
    $query = $mysqli->prepare('UPDATE payment_requests SET user_id=?, amount=?, status=? WHERE id=?');
    $query->bind_param('iisi', $user_id, $amount, $status, $_POST['id']);
    if ($query->execute()) {
        $user_query = $mysqli->prepare('SELECT user_id FROM payment_requests WHERE id=?');
        $user_query->bind_param('i', $_POST['id']);
        $user_query->execute();
        $user_query->bind_result($updated_user_id);
        $user_query->fetch();
        $user_query->close();

        if ($status === 'Accepted') {
            $update_coins_query = $mysqli->prepare('UPDATE users SET coins = coins + ? WHERE id = ?');
            $update_coins_query->bind_param('ii', $amount, $updated_user_id);
            $update_coins_query->execute();
            $update_coins_query->close();
        } elseif ($status === 'Rejected') {
            $query_rejected = $mysqli->prepare('UPDATE payment_requests SET status=? WHERE id=?');
            $query_rejected->bind_param('si', $status, $_POST['id']);
            $query_rejected->execute();
            $query_rejected->close();
        }

        $response['status'] = "payment updated";
    } else {
        $response['status'] = "failed to update payment";
    }
} else {
    $response['status'] = "missing required info!";
}

echo json_encode($response);
?>
