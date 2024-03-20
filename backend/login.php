<?php
    include('connection.php');
    include('./jwt_functions.php'); // Include JWT functions file

    $email = $_POST['email'];
    $password = $_POST['password'];

    $query = $mysqli->prepare('select id,email,password
    from users
    where email=?');
    $query->bind_param('s', $email);
    $query->execute();
    $query->store_result();
    $query->bind_result($id, $email, $hashed_password);
    $query->fetch();
    $num_rows = $query->num_rows();

    if ($num_rows == 0) {
        $response['status'] = "user not found";
    } else {
        if (password_verify($password, $hashed_password)) {
            $token = generateToken($id);
            $response['status'] = "logged_in";
            $response['user_id'] = $id;
            $response['email'] = $email;
            $response['token'] = $token;
        } else {
            $response['status'] = "incorrect credentials";
        }
    }
    header('Content-Type: application/json');
    echo json_encode($response);
?>
