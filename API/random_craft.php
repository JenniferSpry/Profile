<?php

header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/connect_db.php';

$response = array();

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
            $response["success"] = 0;
            $response["message"] = "Es konnten keine Elemente gefunden werden.";
        }
    } catch(PDOException $e) {
        $response["success"] = 0;
        $response["message"] = "Es konnten keine Elemente gefunden werden.";
        $response["error"] = $e->getMessage();
    }
} else {
	$response["success"] = 0;
    $response["message"] = "Es konnten keine Elemente gefunden werden.";
    $response["error"] = "Falscher oder fehlender Php Parameter.";
}

echo json_encode($response);

?>