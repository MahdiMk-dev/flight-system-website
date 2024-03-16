<?php
header("Access-Control-Allow-Origin: *");

header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

header("Content-Type: application/json");


$host = "localhost";
$db_user = "root";
$db_pass = null;
$db_name = "flight-system-website";

$mysqli = new mysqli($host, $db_user, $db_pass, $db_name);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
