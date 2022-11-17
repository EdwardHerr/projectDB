<?php
class ProductDB {   
    private static function loadProduct($row) {
        $product = new Product($row['productName'],
                               $row['productdescription'],
                               $row['listPrice']);
        $product->setID($row['productID']);
        return $product;
    }
}
?>