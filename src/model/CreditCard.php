<?php
class CreditCard {

    public function __construct($username, $cardnumber, $firstName, $lastName, $cardType, $expiryDate, $billingAddress) { 

    }

    public function getCardNumber() {
        return $this->cardnumber;
    }

    public function setCardNumber($value) {
        $this->cardnumber = $value;
    }

    public function getUserName() {
    return $this->username;
    }

    public function setUserName($value) {
        $this->username = $value;
    }
    public function getPassword() {
        return $this->password;
    }

    public function setPassword($value) {
        $this->password = $value;
    }    
    public function getFirstName() {
        return $this->firstName;
    }

    public function setFirstName($value) {
        $this->firstName= $value;
    }
    public function getLastName() {
        return $this->lastName;
    }

    public function setLastName($value) {
        $this->lastName = $value;
    }

    public function getbillingAddress() {
        return $this->billingAddress;
    }

    public function setbillingAddress($value) {
        $this->billingAddress = $value;
    }
    
     public function getExpiryDate() {
        return $this->expiryDate;
    }

    public function setExpiryDate($value) {
        $this->expiryDate = $value;
    }
    
    public function getcardType() {
        return $this->cardType;
    }

    public function setcardType($value) {
        $this->cardType = $value;
    }
    
}
?>