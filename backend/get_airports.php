<?php
include('./connection.php');



$query = $mysqli->prepare('select name,id from airports');

$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = 'no airports';
} else {
    $query->bind_result($name, $id);
    $airports = [];
    while ($query->fetch()) {
        $airport =[
            'id' => $id,
            'name' => $name,
        ];
    $airports[] = $airport;

    $response['status'] = "success";
    $response['airports'] = $airports;
}
}
$query2 = $mysqli->prepare('select name,id from airlines');
$query2->execute();
$query2->store_result();
$num_rows2 = $query2->num_rows();

if ($num_rows2== 0) {
    $response['status'] = 'no airlines';
} else {
    $query2->bind_result($name, $id);
    $airlines = [];
    while ($query2->fetch()) {
        $airline =[
            'id' => $id,
            'name' => $name,
        ];
    $airlines[] = $airline;


    $response['airlines'] = $airlines;
}
}

echo json_encode($response);