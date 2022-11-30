-- create and select the database
DROP DATABASE IF EXISTS e_commerce;
CREATE DATABASE e_commerce;
USE e_commerce;
-- MySQL command
-- create the tables
CREATE TABLE Users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL UNIQUE,
  password VARCHAR(30) NOT NULL,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  address VARCHAR(255) DEFAULT "",
  PRIMARY KEY (id)
);
CREATE TABLE Products(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL,
  listPrice DECIMAL(5,2),
  image VARCHAR(255),
  PRIMARY KEY (id)
);
CREATE TABLE UserOrders(
  id INT NOT NULL AUTO_INCREMENT,
  userID INT NOT NULL,
  orderDate DATETIME NOT NULL,
  FOREIGN KEY (userID) REFERENCES Users(id) ON DELETE RESTRICT,
  PRIMARY KEY (id)
);

CREATE TABLE Orders(
  productID INT NOT NULL,
  userOrderID INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY(productID, userOrderID),
  FOREIGN KEY (productID) REFERENCES Products(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (userOrderID) REFERENCES UserOrders(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

-- create the users
CREATE USER IF NOT EXISTS db_user @localhost IDENTIFIED BY 'pa55word';
GRANT ALL PRIVILEGES ON * TO 'db_user' @'localhost';

-- insert products --
INSERT INTO Products (name, description, image, listPrice)
VALUES (
    'Chicken Alfredo',
    'Pasta with grilled chicken and alfredo sauce',
    'https://www.foodnetwork.com/content/dam/images/food/fullset/2015/9/15/1/FNK_Chicken-Fettucine-Alfredo_s4x3.jpg',
    24.99
  ),
  (
    'Chicken Parmgiana',
    'Two lightly fried parmesan-breaded chicken breasts are smothered with homemade marinara sauce and melted Italian cheeses',
    'https://images.immediate.co.uk/production/volatile/sites/30/2020/12/Chicken-parmigiana-c13fae7.jpg',
    23.79
  ),
  (
    'Spaghetti and Meatballs',
    'Classic spaghetti with bolognese sauce and meatballs',
    'https://d167y3o4ydtmfg.cloudfront.net/369/studio/assets/v1545739412935_460423375/Spaghetti%20and%20Meatballs.jpg',
    21.99
  ),
  (
    'Seafood Alfredo',
    'Fettuccine with creamy, alfredo sauce with shrimp and scallops',
    'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Seafood-Fettuccine-Alfredo_EXPS_DIYDAP22_33885_DR_03_02_1b.jpg',
    27.99
  ),
  (
    'Shrimp Scampi',
    'Shrimp sauteed in a garlic sauce, tossed with asparagus, tomatoes and angel hair',
    'https://www.cookingclassy.com/wp-content/uploads/2019/07/shrimp-scampi-02.jpg',
    24.29
  ),
  (
    'Shrimp Alfredo',
    'Pasta with grilled shrimp and alfredo sauce',
    'https://www.dinneratthezoo.com/wp-content/uploads/2018/06/shrimp-alfredo-6-500x500.jpg',
    24.99
  ),
  (
    'Chicken and Shrimp Carbonara',
    'Spaghetti and carbonara with bacon bits, grilled chicken and shrimp',
    'https://imhungryforthat.com/wp-content/uploads/2021/12/chicken-and-shrimp-carbonara-olive-garden.jpg',
    26.99
  ),
  (
    'Ravioli Carbonara',
    'Cheese ravioli baked in a creamy sauce with bacon, topped with a blend of Italian cheeses',
    'https://rms.condenast.it/rms/public/5d3/f02/6a3/thumb_425_1200_670_0_0_auto.jpg',
    24.99
  ),
  (
    'Chicken Tortelloni Alfredo',
    'Asiago cheese-filled tortelloni baked in alfredo and toasted breadcrumbs, topped with sliced grilled chicken',
    'https://media.olivegarden.com/en_us/images/product/asiago-tortelloni-alfredo-with-grilled-chicken-dpv-1180x730.png',
    24.99
  ),
  (
    'Grilled Chicken Margherita',
    'Grilled chicken breasts with fresh tomatoes, mozzarella, basil pesto and a lemon garlic sauce',
    'https://www.lecremedelacrumb.com/wp-content/uploads/2017/07/grilled-chicken-margherita-101-2.jpg',
    23.99
  );
  
-- create the users --
INSERT INTO Users (username, firstName, lastName, email, password, address)
VALUES (
    'testuser1',
    'John',
    'Doe',
    'johndoe@yahoo.com',
    'testpass1',
    'Surrey BC, 123 Street, 1234'
  ),
  (
    'testuser2',
    'Jane',
    'Doe',
    'janedoe@yahoo.com',
    'testpass2',
    'Surrey BC, 321 Street, 4321'
  );

-- Create shopping carts--
INSERT INTO UserOrders (userID, orderDate)
VALUES (1, '2022-11-19'),
  (2, '2022-11-18'),
  (1, '2022-11-20'),
  (1, '2022-11-21'),
  (1, '2022-11-22');

INSERT INTO Orders (productID, userOrderID, quantity)
VALUES (1, 1, 2),
(2, 2, 10),
(4, 1, 3),
(3, 1, 1),
(7, 3, 3),
(5, 3, 3),
(1, 3, 5),
(2, 3, 5),
(3, 4, 5),
(4, 4, 5);
