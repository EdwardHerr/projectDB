<?php
class OrderDB {   
    
    private static function loadOrder($row) {
    $order = new Order($row['orderID'],
                   $row['username'],
                   $row['orderDate'],
                   $row['cartID']);
    return $order;
    }
    
    public static function getOrder($order) {
        $db = Database::getDB();
        $query = 'SELECT orderID, username, orderDate, cartID 
                  FROM Orders
                  WHERE orderID = :orderID';
        try {
            $statement = $db->prepare($query);
            $statement->bindValue($orderID);
            $statement->execute();
            
            $row = $statement->fetch();
            $statement->closeCursor();
       
            return self::loadOrder($row);
        } catch (PDOException $e) {
            Database::displayError($e->getMessage());
        }
    }
    
    public static function addOrder($order) {
        $db = Database::getDB();
        $query = 'INSERT INTO Orders
                    (orderID, username, orderDate, cartID)
                 VALUES
                    (:orderID, :username, :orderDate, cartID, NOW())';
       try {
           $statement = $db->prepare($query);
           $statement->bindValue(':orderID', $order->getorderID());
           $statement->bindValue(':username', $order->getUserName());
           $statement->bindValue(':orderDate', $order->getorderDate());
           $statement->bindValue(':cartID', $order->getcartID());
           $statement->execute();
           $statement->closeCursor();

           // Get the last product ID that was automatically generated
           return $order->getorderID;
       } catch (PDOException $e) {
           Database::displayError($e->getMessage());
       }
    }
}
?>
