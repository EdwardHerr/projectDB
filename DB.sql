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
  listPrice FLOAT(2),
  PRIMARY KEY (id)
);
CREATE TABLE Carts(
  id INT NOT NULL AUTO_INCREMENT,
  userID INT NOT NULL,
  orderDate DATETIME NOT NULL,
  paid BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (userID) REFERENCES Users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  PRIMARY KEY (id)
);

CREATE TABLE Orders(
  productID INT NOT NULL,
  cartID INT NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY(productID, cartID),
  FOREIGN KEY (productID) REFERENCES Products(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  FOREIGN KEY (cartID) REFERENCES Carts(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE CreditCards (
  id INT NOT NULL AUTO_INCREMENT,
  userID INT NOT NULL,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  cardType VARCHAR(20) NOT NULL,
  cardNumber BIGINT NOT NULL,
  expiryDate DATETIME NOT NULL,
  billingAddresss VARCHAR(255) NOT NULL,
  FOREIGN KEY (userID) REFERENCES Users(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  PRIMARY KEY (id)
);
-- create the users
CREATE USER IF NOT EXISTS db_user @localhost IDENTIFIED BY 'pa55word';
GRANT ALL PRIVILEGES ON * TO 'db_user' @'localhost';

-- insert products --
INSERT INTO Products (name, description, listPrice)
VALUES (
    'Chicken Alfredo',
    'Pasta with grilled chicken and alfredo sauce',
    24.99
  ),
  (
    'Chicken Parmgiana',
    'Two lightly fried parmesan-breaded chicken breasts are smothered with homemade marinara sauce and melted Italian cheeses',
    23.79
  ),
  (
    'Spaghetti and Meatballs',
    'Classic spaghetti with bolognese sauce and meatballs',
    21.99
  ),
  (
    'Seafood Alfredo',
    'Fettuccine with creamy, alfredo sauce with shrimp and scallops',
    27.99
  ),
  (
    'Shrimp Scampi',
    'Shrimp sauteed in a garlic sauce, tossed with asparagus, tomatoes and angel hair',
    24.29
  ),
  (
    'Shrimp Alfredo',
    'Pasta with grilled shrimp and alfredo sauce',
    24.99
  ),
  (
    'Chicken and Shrimp Carbonara',
    'Spaghetti and carbonara with bacon bits, grilled chicken and shrimp',
    26.99
  ),
  (
    'Ravioli Carbonara',
    'Cheese ravioli baked in a creamy sauce with bacon, topped with a blend of Italian cheeses',
    24.99
  ),
  (
    'Chicken Tortelloni Alfredo',
    'Asiago cheese-filled tortelloni baked in alfredo and toasted breadcrumbs, topped with sliced grilled chicken',
    24.99
  ),
  (
    'Grilled Chicken Margherita',
    'Grilled chicken breasts with fresh tomatoes, mozzarella, basil pesto and a lemon garlic sauce',
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
-- create the credit cards --
INSERT INTO CreditCards (userID, firstName, lastName, cardType, cardNumber, expiryDate, billingAddresss)
VALUES(
    1,
    'John',
    'Doe',
    'Visa',
    123456789012,
    '2022-11-16',
    'Surrey BC, 123 Street, 1234'
  ),
  (
    2,
    'Jane',
    'Doe',
    'Mastercard',
    098765432123,
    '2022-11-16',
    'Surrey BC, 321 Street, 4321'
  );

-- Create shopping carts--
INSERT INTO Carts (userID, orderDate, paid)
VALUES (1, '2022-11-19', 0),
  (2, '2022-11-18', 1);

INSERT INTO Orders (productID, cartID, quantity)
VALUES (
    1,
    1,
    2
),
(
    2,
    2,
    10
),
(
    4,
    1,
    3
),
(
    3,
    1,
    1
);

