<?php

header("Access-Control-Allow-Origin: *");

require_once __DIR__ . '/connect_db.php';

if (isset($_GET["id"])) {
    try {
        $dbh = connect_db();
        $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = "SELECT * FROM crafts WHERE id = :id";

        $stmt = $dbh->prepare($query);

        $stmt->execute(array('id' => $_GET["id"]));
     
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
            echo json_encode($craftybit);
        } else {
            // $response["success"] = 1;
            // $response["message"] = "Es konnten keine Elemente gefunden werden.";
        }
    } catch(PDOException $e) {
        // $response["success"] = $e->getMessage();
        // $response["message"] = "Es konnten keine Elemente gefunden werden.";
        // $response["error"] = $e->getMessage();
    }
}

?>