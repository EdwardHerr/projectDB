<?php
class OrderDB {   
    public static function getAllOrders($userId) {
        $db = Database::getDB();
        $query = 'SELECT
                    uo.id AS orderId,
                    uo.orderDate AS orderDate,
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
                $order = array('orderId' => $row['orderId'], 'orderDate' => $row['orderDate'], 'productId' => $row['productId'], 'quantity' => $row['quantity']);
                $orderss[] = $order;
            }
            return $orders;
        } catch (PDOException $e) {
            return $e;
        }
    }
    
    public static function getOrderById($orderId) {
        $db = Database::getDB();
        $query = 'SELECT uo.id AS orderId,
                    uo.orderDate AS orderDate,
                    p.id AS productId,
                    p.name AS Product name,
                    o.quantity AS quantity
                    FROM Users u
                    INNER JOIN UserOrders uo ON u.id = uo.userID
                    INNER JOIN Orders o ON uo.id = o.userOrderID
                    INNER JOIN Products p ON p.id = o.productID
                    WHERE uo.id = :orderId';
                    
        try {
            $statement = $db->prepare($query);
            $statement->bindValue('orderId', $orderId);
            $statement->execute();
            
            $rows = $statement->fetchAll(\PDO::FETCH_ASSOC);
            $statement->closeCursor();
            $orders = [];
            foreach ($rows as $row) {
                $order = array('orderId' => $row['orderId'], 'orderDate' => $row['orderDate'], 'productId' => $row['productId'], 'quantity' => $row['quantity']);
                $orderss[] = $order;
            }
            return $orders;
        } catch (PDOException $e) {
            return $e;
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
