<?php
include('connection.php');

$response = array(); // Initialize response array

if (isset($_POST['email']) && isset($_POST['password']) && isset($_POST['username'])) {
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $check_email = $mysqli->prepare('SELECT email FROM users WHERE email = ?');
    $check_email->bind_param('s', $email);
    $check_email->execute();
    $check_email->store_result();
    $email_exists = $check_email->num_rows();

    if ($email_exists == 0) {
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        $query = $mysqli->prepare('INSERT INTO users (username, password, email) VALUES (?, ?, ?)');
        $query->bind_param('sss', $username, $hashed_password, $email);
        $query->execute();
        $created_id = $mysqli->insert_id;
        $response['id'] = $created_id;
        $response['status'] = "success";
        $response['message'] = "User $username was created successfully";
    } else {
        $response["status"] = "error";
        $response["message"] = "User already exists";
    }
} else {
    $response["status"] = "error";
    $response["message"] = "Missing required fields";
}

header('Content-Type: application/json');
echo json_encode($response);
?>
