
--
USE e_commerce;

SELECT u.firstName as 'First Name',
c.id as 'Cart ID',
c.orderDate as 'Order Date',
p.name as 'Product name',
p.description as 'Description'
FROM Users u
INNER JOIN Carts c ON u.id = c.userID
INNER JOIN Orders o ON c.id = o.cartID
INNER JOIN Products p ON p.id = o.productID
WHERE c.id = '1' AND c.paid;