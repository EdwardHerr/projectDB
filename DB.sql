-- create and select the database
DROP DATABASE IF EXISTS e_commerce;
CREATE DATABASE e_commerce;
CREATE USER 'user'@'localhost' IDENTIFIED BY 'pa55word';
USE e_commerce;  -- MySQL command

-- create the tables
CREATE TABLE Users (
  username         VARCHAR(255) NOT NULL UNIQUE,
  password         VARCHAR(255) NOT NULL,
  firstName        VARCHAR(255) NOT NULL,
  lastName         VARCHAR(255) NOT NULL,
  email            VARCHAR(255) NOT NULL,
  address          VARCHAR(255) NOT NULL,
  PRIMARY KEY (username)
);

CREATE TABLE Products (
  productID          INT(11)        NOT NULL   AUTO_INCREMENT,
  productName        VARCHAR(255)   NOT NULL,
  productDescription VARCHAR(255)   NOT NULL,
  listPrice          DECIMAL(10,2),
  PRIMARY KEY (productID)
);

CREATE TABLE Users_Carts(
    username   VARCHAR(255)       NOT NULL,
    cartID           INT(11)      NOT NULL,
    PRIMARY KEY (cartID, username),
    FOREIGN KEY (username) REFERENCES Users(username)
);

CREATE TABLE Carts(
    cartID           INT(11)      NOT NULL AUTO_INCREMENT,
    productID        INT(11)      NOT NULL,
    quantity         INT(11)      NOT NULL,
    PRIMARY KEY (cartID, productID),
    FOREIGN KEY (productID) REFERENCES Products(productID)
);

CREATE TABLE Orders (
  orderID            INT(11)    NOT NULL AUTO_INCREMENT,
  username     VARCHAR(255)     NOT NULL,
  orderDate          DATETIME   NOT NULL,
  cartID           INT(11)      NOT NULL,
  FOREIGN KEY (username) REFERENCES Users(username),
  FOREIGN KEY (cartID) REFERENCES Carts(cartID),
  PRIMARY KEY (orderID)
  );
  
  CREATE TABLE CreditCards (
  username          VARCHAR(255)   NOT NULL, 
  firstName         VARCHAR(255)   NOT NULL,
  lastName          VARCHAR(255)   NOT NULL,
  cardType          VARCHAR(255)   NOT NULL,
  cardNumber        INT(12)        NOT NULL,
  expiryDate        DATETIME       NOT NULL,
  billingAddresss   VARCHAR(255)   NOT NULL,
  PRIMARY KEY (username),
  FOREIGN KEY (username) REFERENCES Users(username)
  );
  
  INSERT INTO products VALUES
  (1, 'Chicken Alfredo', 'Pasta with grilled chicken and alfredo sauce', '24.99'),
  (2, 'Chicken Parmgiana', 'Two lightly fried parmesan-breaded chicken breasts are smothered with homemade marinara sauce and melted Italian cheeses', '23.79'),
  (3, 'Spaghetti and Meatballs', 'Classic spaghetti with bolognese sauce and meatballs', '21.99'),
  (4, 'Seafood Alfredo', 'Fettuccine with creamy, alfredo sauce with shrimp and scallops', '27.99'),
  (5, 'Shrimp Scampi', 'Shrimp sautéed in a garlic sauce, tossed with asparagus, tomatoes and angel hair', '24.29'),
  (6, 'Shrimp Alfredo', 'Pasta with grilled shrimp and alfredo sauce', '24.99'),
  (7, 'Chicken and Shrimp Carbonara', 'Spaghetti and carbonara with bacon bits, grilled chicken and shrimp', '26.99'),
  (8, 'Ravioli Carbonara', 'Cheese ravioli baked in a creamy sauce with bacon, topped with a blend of Italian cheeses', '24.99'),
  (9, 'Chicken Tortelloni Alfredo', 'Asiago cheese-filled tortelloni baked in alfredo and toasted breadcrumbs, topped with sliced grilled chicken', '24.99'),
  (10, 'Grilled Chicken Margherita', 'Grilled chicken breasts with fresh tomatoes, mozzarella, basil pesto and a lemon garlic sauce', '23.99');