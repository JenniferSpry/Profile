<?php

header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/connect_db.php';

$response = array();
$response["success"] = 0;

try {
    $dbh = connect_db();
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "SELECT * FROM illus ORDER BY date DESC";

    $stmt = $dbh->prepare($query);

    $stmt->execute();
 
    $result = $stmt->fetchAll();

    if ( count($result) ) {
        // success
        $response["data"] = array();
        foreach($result as $row) {
            $illu = array();
            $illu["id"] = $row["id"];
            $illu["title"] = $row["title"];
            $illu["imageFileName"] = $row["image_file_name"];
            $illu["customer"] = $row["customer"];
            $illu["customerLink"] = $row["customer_link"];

            array_push($response["data"], $illu);
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