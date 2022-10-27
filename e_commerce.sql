-- create and select the database
DROP DATABASE IF EXISTS e_commerce.sql;
CREATE DATABASE e_commerce.sql;
USE e_commerce.sql;  -- MySQL command

-- create the tables
CREATE TABLE USERS (
  userName         VARCHAR(255) NOT NULL,
  password         VARCHAR(255) NOT NULL,
  firstName        VARCHAR(255) NOT NULL,
  lastName         VARCHAR(255) NOT NULL,
  email            VARCHAR(255) NOT NULL,
  address          VARCHAR(255) NOT NULL,
  PRIMARY KEY (userName)
);

CREATE TABLE products (
  productID          INT(11)        NOT NULL   AUTO_INCREMENT,
  productName        VARCHAR(255)   NOT NULL,
  productDescription VARCHAR(255)   NOT NULL,
  listPrice          DECIMAL(10,2)
  PRIMARY KEY (productID)
);

CREATE TABLE carts(
    users_Username   VARCHAR(255) NOT NULL,
    productID        INT(11)      NOT NULL,
    cartID           INT(11)      NOT NULL,
    PRIMARY KEY (cartID, users_Username)
    FOREIGN KEY (users_Username)
    FOREIGN KEY (productID)

);

CREATE TABLE orders (
  orderID            INT(11)        NOT NULL   AUTO_INCREMENT,
  users_Username     VARCHAR(255)   NOT NULL,
  orderDate          DATETIME       NOT NULL,
  PRIMARY KEY (orderID)
  FOREIGN KEY (users_Username)
  FOREIGN KEY (cartID)
  );
  
  CREATE TABLE creditCards (
  users_Username    VARCHAR(255)   NOT NULL,
  firstName         VARCHAR(255)   NOT NULL,
  lastName          VARCHAR(255)   NOT NULL,
  cardType          VARCHAR(255)   NOT NULL,
  cardNumber        INT(12)        NOT NULL
  expiryDate        DATETIME       NOT NULL,
  billingAddresss   VARCHAR(255)   NOT NULL,
  PRIMARY KEY (users_Username)
  FOREIGN KEY (users_Username)
  );
