<?php
class Order {

    public function __construct($orderID, $username, $orderDate, $cartID) { 

    }

    public function getorderID() {
        return $this->orderID;
    }

    public function setID($value) {
        $this->orderID = $value;
    }

    public function getUserName() {
        return $this->username;
    }

    public function setUserName($value) {
        $this->username = $value;
    }
    
    public function getorderDate() {
    return $this->orderDate;
    }
    
    public function setorderDate($value) {
    $this->orderDate = $orderDate;
    }
    
    public function getcartID() {
    return $this->cartID;
    }
    
    public function setcartID($value) {
    $this->cartID = $cartID;
    }
}
?>