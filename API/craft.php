<?php

header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/connect_db.php';

$response = array();
$response["success"] = 0;

if (isset($_GET["id"])) {
    try {
        $dbh = connect_db();
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = "SELECT * FROM crafts WHERE id = :id";

        $stmt = $dbh->prepare($query);

        $stmt->execute(array('id' => $_GET["id"]));
     
        $result = $stmt->fetchAll();

        if ( count($result) ) {
            // success
            $craftybit = array();
            foreach($result as $row) {
                $craftybit["id"] = $row["id"];
                $craftybit["title"] = $row["title"];
                $craftybit["imageFileName"] = $row["image_file_name"];
                $craftybit["description"] = $row["description"];
            }
            $response["data"] = $craftybit;
            $response["success"] = 1;
        } else {
            $response["message"] = "No elements were found.";
            $response["error"] = "Empty result.";
        }
    } catch(PDOException $e) {
        $response["message"] = "No elements were found.";
        $response["error"] = $e->getMessage();
    }
} else {
    $response["message"] = "No elements were found.";
    $response["error"] = "Wrong or missing parameter.";
}

echo json_encode($response);

?>