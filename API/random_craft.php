<?php

header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/connect_db.php';

$response = array();
$response["success"] = 0;

if (isset($_GET["amount"]) && isset($_GET["id"])) {
    try {
        $dbh = connect_db();
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = "SELECT * FROM crafts WHERE id != :id ORDER BY RAND() LIMIT :amount";

        $stmt = $dbh->prepare($query);

        $stmt->bindValue(':amount', intval(trim($_GET['amount'])), PDO::PARAM_INT);
        $stmt->bindValue(':id', intval(trim($_GET['id'])), PDO::PARAM_INT);
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
} else {
    $response["message"] = "No elements were found.";
    $response["error"] = "Wrong or missing parameter.";
}

echo json_encode($response);

?>