<?php
class Database {
    private static $dsn = 'mysql:host=localhost;dbname=e_commerce';
    private static $username = 'db_user';
    private static $password = 'pa55word';
    private static $options = [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
    private static $db;

    private function __construct() {}

    public static function getDB() {
        if (!isset(self::$db)) {
            try {
                self::$db = new PDO(self::$dsn,
                                    self::$username,
                                    self::$password,
                                    self::$options);
            } catch (PDOException $e) {
                self::displayError($e->getMessage());
            }
        }
        return self::$db;
    }
}
?>