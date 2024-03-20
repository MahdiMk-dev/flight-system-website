<?php
    use \Firebase\JWT\JWT;
    use Firebase\JWT\Key;
    use \Firebase\JWT\ExpiredException;
    require_once('./vendor/autoload.php'); // 

    require_once('./config.php');
    function generateToken($user_id) {
    $secretKey  = secretKey;
    $issuedAt   = new DateTimeImmutable();
    $expire     = $issuedAt->modify('+120 minutes')->getTimestamp();      // Add 60 seconds
    $serverName = "http://localhost/flightsWebsite/flight-system-website/";
    $username   = $user_id;                                           // Retrieved from filtered POST data

    $data = [
        'iat'  => $issuedAt->getTimestamp(),         // Issued at: time when the token was generated
        'iss'  => $serverName,                       // Issuer
        'nbf'  => $issuedAt->getTimestamp(),         // Not before
        'exp'  => $expire,                           // Expire
        'userName' => $username,                     // User name
    ];

    $jwt= JWT::encode(
        $data,
        $secretKey,
        'HS512'
    );
    return $jwt;
    }

    function verifyToken($jwt) {
        $secretKey  = secretKey;
        $response=[];
        try{
        $token = JWT::decode($jwt, new Key($secretKey, 'HS512'));
        $now = new DateTimeImmutable();
        $serverName = "http://localhost/flight-system-website/";
        $response["message"]="success";
        $response["user"]= $token->userName;
        } catch (ExpiredException $e) {
    // JWT token has expired
            $response["message"]=$e->getMessage();
        } catch (Exception $e) {
            // Other JWT decoding errors
            $response["message"]=$e->getMessage();
            // Handle other JWT decoding errors gracefully
        }

        return $response;

            
    }
    function validate_token_exist($headers){
        if(isset($headers['Authorization'])){
        if (! preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
        $response["message"]= 'Token not found in request';

    }


    $jwt = $matches[1];
    if (! $jwt) {
        // No token was able to be extracted from the authorization header
        $response["message"]="No Token Sent";
    }
    else{
        $response["message"]="success";
    }
    $response['jwt']=$jwt;
    }
    else
        $response["message"]= 'Token not found in request';
    return $response;
    }
?>
