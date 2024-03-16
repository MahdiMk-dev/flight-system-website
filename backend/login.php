<?php
    include('connection.php');

    $email = $_POST['email'];
    $password = $_POST['password'];

    function generateToken() {
        $token=bin2hex(random_bytes(16)); // 16 bytes = 128 bits
        return $token;
    }
    $query = $mysqli->prepare('select id,email,password,username
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
            $token=generateToken();
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
