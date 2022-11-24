
--
USE e_commerce;

SELECT u.firstName as 'First Name',
uo.id as 'UserOrder ID',
uo.orderDate as 'Order Date',
p.name as 'Product name',
p.description as 'Description',
o.quantity as 'Quantity'
FROM Users u
INNER JOIN UserOrders uo ON u.id = uo.userID
INNER JOIN Orders o ON uo.id = o.userOrderID
INNER JOIN Products p ON p.id = o.productID
WHERE uo.id = '1';