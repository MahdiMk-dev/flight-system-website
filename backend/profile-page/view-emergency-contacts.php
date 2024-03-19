<?php
include('../connection.php');

$user_id = $_GET['user_id'];

$query = $mysqli->prepare('select name, phone_number, email, relation from emergency_contacts where user_id = ?');

$query->bind_param('i', $user_id);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = 'no emergency conatacts';
} else {
    $query->bind_result($name, $phone_number, $email, $relation);
    $contacts = [];
    while ($query->fetch()) {
        $contact =[
            'name' => $name,
            'phone_number' => $phone_number,
            'email' => $email,
            'relation' => $relation
        ];
    $contacts[] = $contact;

    $response['status'] = "success";
    $response['contacts'] = $contacts;
}
}

echo json_encode($response);