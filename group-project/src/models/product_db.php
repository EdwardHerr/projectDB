<?php
class ProductDB {   
    
    private static function loadProduct($row) {
        $product = new Product($row['productName'],
                               $row['description'],
                               $row['listPrice']);
        $product->setID($row['productID']);
        return $product;
    }

    public static function getProduct($product_id) {
        $db = Database::getDB();
        
        $query = 'SELECT productID, productName, 
                     description, listPrice,
                  FROM products
                  WHERE productID = :product_id';
        try {
            $statement = $db->prepare($query);
            $statement->bindValue(':product_id', $product_id);
            $statement->execute();
            
            $row = $statement->fetch();
            $statement->closeCursor();
            
            return self::loadProduct($row);
        } catch (PDOException $e) {
            Database::displayError($e->getMessage());
        }
    }
    
}
?>