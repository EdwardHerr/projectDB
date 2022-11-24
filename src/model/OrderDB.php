<?php
class OrderDB {   
    public static function getAllOrders($userId) {
        $db = Database::getDB();
        $query = 'SELECT
                    uo.id AS orderId,
                    DATE(uo.orderDate) AS orderDate,
                    u.address AS address,
                    ROUND(SUM(p.listPrice * o.quantity), 2) AS total
                    FROM Users u
                    INNER JOIN UserOrders uo ON u.id = uo.userID
                    INNER JOIN Orders o ON uo.id = o.userOrderID
                    INNER JOIN Products p ON p.id = o.productID
                    WHERE u.id = :userId
                    GROUP BY orderId
                    ORDER BY orderDate DESC';
                    
        try {
            $statement = $db->prepare($query);
            $statement->bindValue(':userId', $userId);
            $statement->execute();
            
            $rows = $statement->fetchAll(\PDO::FETCH_ASSOC);
            $statement->closeCursor();
            $orders = [];
            foreach ($rows as $row) {
                $order = array('orderId' => $row['orderId'], 'orderDate' => $row['orderDate'], 'address' => $row['address'], 'total' => $row['total']);
                $orders[] = $order;
            }
            return $orders;
        } catch (PDOException $e) {
            return $e;
        }
    }
    
    public static function getOrderById($userId, $orderId) {
        $db = Database::getDB();
        $query = 'SELECT 
                    p.id AS productId,
                    p.name AS productName,
                    p.description as description,
                    o.quantity AS quantity,
                    p.listPrice as listPrice
                    FROM Users u
                    INNER JOIN UserOrders uo ON u.id = uo.userID
                    INNER JOIN Orders o ON uo.id = o.userOrderID
                    INNER JOIN Products p ON p.id = o.productID
                    WHERE uo.id = :orderId AND u.id = :userId';
                    
        try {
            $statement = $db->prepare($query);
            $statement->bindValue('userId', $userId);
            $statement->bindValue('orderId', $orderId);
            $statement->execute();
            
            $rows = $statement->fetchAll(\PDO::FETCH_ASSOC);
            $statement->closeCursor();
            $orders = [];
            foreach ($rows as $row) {
                $order = array('productId' => $row['productId'], 'productName' => $row['productName'], 'description' => $row['description'], 'quantity' => $row['quantity'], 'listPrice' => $row['listPrice']);
                $orders[] = $order;
            }
            return $orders;
        } catch (PDOException $e) {
            return $e;
        }
    }
    
    // public static function addOrder($order) {
    //     $db = Database::getDB();
    //     $query = 'INSERT INTO Orders
    //                 (orderID, username, orderDate, cartID)
    //              VALUES
    //                 (:orderID, :username, :orderDate, cartID, NOW())';
    //   try {
    //       $statement = $db->prepare($query);
    //       $statement->bindValue(':orderID', $order->getorderID());
    //       $statement->bindValue(':username', $order->getUserName());
    //       $statement->bindValue(':orderDate', $order->getorderDate());
    //       $statement->bindValue(':cartID', $order->getcartID());
    //       $statement->execute();
    //       $statement->closeCursor();

    //       // Get the last product ID that was automatically generated
    //       return $order->getorderID;
    //   } catch (PDOException $e) {
    //       Database::displayError($e->getMessage());
    //   }
    // }
}
?>
