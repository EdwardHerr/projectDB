<?php
include_once("./Database.php");
include_once("./UserDB.php");

$row = UserDB::getUser('testuser1');
print_r($row);
echo $row['username']

?>