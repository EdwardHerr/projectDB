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
            
            $product = array('id' => $row['id'], 'name' => $row['name'], 'description' => $row['description'], 'image' => $row['image'], 'listPrice' => $row['listPrice']);
            return $product;
        } catch (PDOException $e) {
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
                $product = array('id' => $row['id'], 'name' => $row['name'], 'description' => $row['description'], 'image' => $row['image'], 'listPrice' => $row['listPrice']);
                $products[] = $product;
            }
            return $products;
        } catch (PDOException $e) {
            return "Unable to get products";
        }
    }
}
?>