<?php
class User {
    public function __construct(
        private string $username,
        private string $password,
        private string $firstname,
        private string $lastname,
        private string $email,
        private string $address,
    ) { }

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