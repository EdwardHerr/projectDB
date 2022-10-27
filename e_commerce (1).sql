-- create and select the database
DROP DATABASE IF EXISTS e_commerce.sql;
CREATE DATABASE e_commerce.sql;
USE e_commerce.sql;  -- MySQL command

-- create the tables
CREATE TABLE Users (
  username         VARCHAR(255) NOT NULL UNIQUE REQUIRED,
  password         VARCHAR(255) NOT NULL REQUIRED,
  firstName        VARCHAR(255) NOT NULL REQUIRED,
  lastName         VARCHAR(255) NOT NULL REQUIRED,
  email            VARCHAR(255) NOT NULL REQUIRED,
  address          VARCHAR(255) NOT NULL,
  PRIMARY KEY (username)
);

CREATE TABLE Products (
  productID          INT(11)        NOT NULL   AUTO_INCREMENT,
  productName        VARCHAR(255)   NOT NULL,
  productDescription VARCHAR(255)   NOT NULL,
  listPrice          DECIMAL(10,2)
  PRIMARY KEY (productID)
);

CREATE TABLE Carts(
    username   VARCHAR(255) NOT NULL FOREIGN KEY REFERENCES Users(username),
    productID        INT(11)      NOT NULL FOREIGN KEY REFERENCES Products(productID),
    cartID           INT(11)      NOT NULL,
    PRIMARY KEY (cartID, username)
    

);

CREATE TABLE Orders (
  orderID            INT(11)        NOT NULL   AUTO_INCREMENT,
  username     VARCHAR(255)   NOT NULL FOREIGN KEY REFERENCES Users(username),
  orderDate          DATETIME       NOT NULL,
  cartID INT(11) NOT NULL FOREIGN KEY REFERENCES Carts(cart_ID)
  PRIMARY KEY (orderID)
  );
  
  CREATE TABLE CreditCards (
  username    VARCHAR(255)   NOT NULL FOREIGN KEY REFERENCES Users(username),
  firstName         VARCHAR(255)   NOT NULL,
  lastName          VARCHAR(255)   NOT NULL,
  cardType          VARCHAR(255)   NOT NULL,
  cardNumber        INT(12)        NOT NULL
  expiryDate        DATETIME       NOT NULL,
  billingAddresss   VARCHAR(255)   NOT NULL,
  PRIMARY KEY (username)
  
  );
