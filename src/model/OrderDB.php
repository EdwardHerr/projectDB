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
    
    public static function addOrder($userId, $orderDate, $products) {
        $db = Database::getDB();
        $db->beginTransaction();
        $query1 = 'INSERT INTO UserOrders (userID, orderDate) VALUES (:userId, :orderDate)';
        $query2 = 'INSERT INTO Orders(productID, userOrderID, quantity) VALUES (:productId, :userOrderId, :quantity)';
        try {
            $statement = $db->prepare($query1);
            $statement->bindValue(':userId', $userId, PDO::PARAM_INT);
            $statement->bindValue(':orderDate', $orderDate);
            $statement->execute();
            $userOrderId = $db->lastInsertId();
            echo json_encode($userOrderId);
            foreach($products as $item) {
                // print_r($item);
                // echo $item->productId;
                $statement = $db->prepare($query2);
                $statement->bindValue(':productId', $item->productId);
                $statement->bindValue(':userOrderId', $userOrderId);
                $statement->bindValue(':quantity', $item->quantity);
                $statement->execute();
            }
          
            $db->commit();
            $statement->closeCursor();
            return true;
        } catch (PDOException $e) {
            $db->rollBack();
            return $e;
        }
    }
}
?>
