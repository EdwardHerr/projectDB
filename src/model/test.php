<?php
include_once("./Database.php");
include_once("./UserDB.php");
include_once("./ProductDB.php");

// $row = UserDB::getUser('testuser1');
$rows = ProductDB::getAllProducts();
print_r($rows);
echo $row['password']

?>