<?php

header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/connect_db.php';

$response = array();
$response["success"] = 0;

try {
    $dbh = connect_db();
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "SELECT * FROM crafts ORDER BY date DESC";

    $stmt = $dbh->prepare($query);

    $stmt->execute();
 
    $result = $stmt->fetchAll();

    if ( count($result) ) {
        // success
        $response["data"] = array();
        foreach($result as $row) {
            $craftybit = array();
            $craftybit["id"] = $row["id"];
            $craftybit["title"] = $row["title"];
            $craftybit["imageFileName"] = $row["image_file_name"];
            $craftybit["alt"] = $row["alt"];

            array_push($response["data"], $craftybit);
        }
        $response["success"] = 1;
    } else {
        $response["message"] = "No elements were found.";
        $response["error"] = "Empty result.";
    }
} catch(PDOException $e) {
    $response["message"] = "No elements were found.";
    $response["error"] = $e->getMessage();
}

echo json_encode($response);

?>