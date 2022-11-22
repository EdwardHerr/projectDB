<?php
class ProductDB {   
     public static function getProduct($productId) {
        $db = Database::getDB();
        $query = 'SELECT *
                  FROM Products
                  WHERE id = :id';
        try {
            $statement = $db->prepare($query);
            $statement->bindValue(':id', $productId);
            $statement->execute();
            
            $row = $statement->fetch();
            $statement->closeCursor();
            
            // return self::loadUser($row);
            return $row;
        } catch (PDOException $e) {
            // Database::displayError($e->getMessage());
            return $e;
        }
    }
     public static function getAllProducts() {
        $db = Database::getDB();
        $query = 'SELECT id, name, description, listPrice
                  FROM Products';
        try {
            $statement = $db->prepare($query);
            $statement->execute();
            
            $rows = $statement->fetchAll(\PDO::FETCH_ASSOC);
            $statement->closeCursor();
            $products = [];
            foreach ($rows as $row) {
                $product = array('id' => $row['id'], 'name' => $row['name'], 'description' => $row['description'], 'listPrice' => $row['listPrice']);
                $products[] = $product;
                // $products[] = $product;
            }
            // return self::loadUser($row);
            return $products;
            // return $rows;
        } catch (PDOException $e) {
            return "Unable to get products";
        }
    }
}
?>