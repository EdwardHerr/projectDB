<?php
class User {
    private $username;
    private $firstName;
    private $lastName;
    private $email;
    private $password;
    private $address;
        
    public function __construct($username, $firstName, $lastName, $email, $password, $address = "") {
        $this->username = $username;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = $email;
        $this->password = $password;
        $this->address = $address;
    }
    public function getUserName() {
        return $this->username;
    }

    public function setUserName(string $value) {
        $this->username = $value;
    }
    public function getPassword() {
        return $this->password;
    }

    public function setPassword(string $value) {
        $this->password = $value;
    }    
    public function getFirstName() {
        return $this->firstName;
    }

    public function setFirstName(string $value) {
        $this->firstName= $value;
    }
    public function getLastName() {
        return $this->lastName;
    }

    public function setLastName(string $value) {
        $this->lastName = $value;
    }
    public function getEmail() {
        return $this->email;
    }

    public function setEmail(string $value) {
        $this->email = $value;
    }
    public function getAddress() {
        return $this->address;
    }

    public function setAddress(string $value) {
        $this->address = $value;
    }
}
?>