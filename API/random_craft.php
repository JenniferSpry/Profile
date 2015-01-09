<?php

header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/connect_db.php';

$response = array();

if (isset($_GET["amount"])) {
    try {
        $dbh = connect_db();
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = "SELECT * FROM crafts ORDER BY RAND() LIMIT :amount";

        $stmt = $dbh->prepare($query);

        $stmt->execute(array('id' => $_GET["amount"]));
     
        $result = $stmt->fetchAll();

        $craftybit = array();

        if ( count($result) ) {
            // success
            foreach($result as $row) {
                $craftybit["id"] = $row["id"];
                $craftybit["title"] = $row["title"];
                $craftybit["imageFileName"] = $row["image_file_name"];
                $craftybit["alt"] = $row["alt"];
            }
            $response["success"] = 1;
            $response["data"] = $craftybit;
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