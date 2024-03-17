<?php
    require_once('vendor/autoload.php'); // Assuming you have installed JWT library via Composer
    use \Firebase\JWT\JWT;

    function generateToken($user_id) {
        $payload = array(
            "user_id" => $user_id,
            "iat" => time(), // Issued at time
            "exp" => time() + (60 * 60) // Expiration time (1 hour)
        );
        $jwt = JWT::encode($payload, 'your_secret_key'); // Change 'your_secret_key' to a secret key of your choice
        return $jwt;
    }

    function verifyToken($token) {
        try {
            $decoded = JWT::decode($token, 'your_secret_key', array('HS256')); // Change 'your_secret_key' to your actual secret key
            return $decoded->user_id; // Assuming user_id is included in the token payload
        } catch (Exception $e) {
            return false; // Token verification failed
        }
    }
?>
