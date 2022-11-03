-- create and select the database
DROP DATABASE IF EXISTS e_commerce;
CREATE DATABASE e_commerce;
USE e_commerce;  -- MySQL command

-- create the tables
CREATE TABLE Users (
  username         VARCHAR(255) NOT NULL,
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

CREATE TABLE Carts(
    username   VARCHAR(255)       NOT NULL,
    productID        INT(11)      NOT NULL,
    cartID           INT(11)      NOT NULL,
    PRIMARY KEY (cartID, username),
    FOREIGN KEY (username) REFERENCES Users(username),
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
