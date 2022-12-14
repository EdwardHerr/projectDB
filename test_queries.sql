
--
USE e_commerce;

SELECT u.firstName AS 'First Name',
uo.id AS 'UserOrder ID',
uo.orderDate AS 'Order Date',
p.name AS 'Product name',
p.description AS 'Description',
o.quantity AS 'Quantity'
FROM Users u
INNER JOIN UserOrders uo ON u.id = uo.userID
INNER JOIN Orders o ON uo.id = o.userOrderID
INNER JOIN Products p ON p.id = o.productID
WHERE uo.id = '1';


-- get single order --
SELECT uo.id AS 'orderId',
uo.orderDate AS 'orderDate',
p.id AS 'productId',
p.name AS 'Product name',
o.quantity AS 'quantity'
FROM Users u
INNER JOIN UserOrders uo ON u.id = uo.userID
INNER JOIN Orders o ON uo.id = o.userOrderID
INNER JOIN Products p ON p.id = o.productID
WHERE uo.id = 1;

-- get all orders --
SELECT
uo.id AS orderId,
DATE(uo.orderDate) AS orderDate,
u.address AS address,
p.id AS productId,
ROUND(SUM(p.listPrice * o.quantity), 2) AS total
FROM Users u
INNER JOIN UserOrders uo ON u.id = uo.userID
INNER JOIN Orders o ON uo.id = o.userOrderID
INNER JOIN Products p ON p.id = o.productID
WHERE u.id = 1
GROUP BY orderId
ORDER BY orderDate DESC;

SELECT 
p.id AS productId,
p.name AS productName,
p.description as description,
o.quantity AS quantity,
p.listPrice as listPrice
FROM Users u
INNER JOIN UserOrders uo ON u.id = uo.userID
INNER JOIN Orders o ON uo.id = o.userOrderID
INNER JOIN Products p ON p.id = o.productID
WHERE uo.id = 1 AND u.id = 1

SELECT *
FROM
UserOrders
INNER JOIN
Orders
INNER JOIN Users
WHERE UserOrders.id = Orders.userOrderID AND UserOrders.userID = Users.id
ORDER BY UserOrders.id;

BEGIN:
INSERT INTO UserOrders (userID, orderDate)
VALUES (1, '2022-11-25');
INSERT INTO Orders(productID, userOrderID, quantity)
VALUES (6, LAST_INSERT_ID(), 2);
COMMIT;


BEGIN;
INSERT INTO UserOrders (userID, orderDate) VALUES (2, '2022-11-25');
INSERT INTO Orders(productID, userOrderID, quantity) VALUES (8, LAST_INSERT_ID(), 2);
COMMIT;
