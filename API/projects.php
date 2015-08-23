<?php

header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/connect_db.php';

$response = array();
$response["success"] = 0;

try {
    $dbh = connect_db();
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = "SELECT * FROM code_projects WHERE active = 1 ORDER BY weight";

    $stmt = $dbh->prepare($query);

    $stmt->execute();
 
    $result = $stmt->fetchAll();

    if ( count($result) ) {
        // success
        $response["data"] = array();
        foreach($result as $row) {
            $project = array();
            $project["id"] = $row["id"];
            $project["title"] = $row["title"];
            $project["description"] = $row["description"];
            $project["imageFileName"] = $row["image_file_name"];
            $project["done"] = $row["done"];
            $project["link"] = $row["link"];

            array_push($response["data"], $project);
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