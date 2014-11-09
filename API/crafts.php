<?php

header("Access-Control-Allow-Origin: *");

$response = array();

require_once __DIR__ . '/connect_db.php';

try {
    $dbh = connect_db();
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "SELECT * FROM crafts";

    $stmt = $dbh->prepare($query);

    $stmt->execute();
 
    $result = $stmt->fetchAll();

    if ( count($result) ) {
        // success

        foreach($result as $row) {
            $craftybit = array();
            $craftybit["id"] = $row["id"];
            $craftybit["title"] = $row["title"];
            $craftybit["imageFileName"] = $row["image_file_name"];
            $craftybit["alt"] = $row["alt"];

            array_push($response, $craftybit);
        }

    } else {
        $response["success"] = 1;
        // $response["message"] = "Es konnten keine Elemente gefunden werden.";
    }
} catch(PDOException $e) {
    $response["success"] = $e->getMessage();
    // $response["message"] = "Es konnten keine Elemente gefunden werden.";
    // $response["error"] = $e->getMessage();
}

echo json_encode($response);

?>