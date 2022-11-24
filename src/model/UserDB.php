<?php

class UserDB {
 public static function getUser($username) {
        $db = Database::getDB();
        $query = 'SELECT id, username, password, firstName, lastName, 
                     email, address 
                  FROM Users
                  WHERE username = :username';
        try {
            $statement = $db->prepare($query);
            $statement->bindValue(':username', $username);
            $statement->execute();
            $row = $statement->fetch();
            $statement->closeCursor();
            
            return $row;
        } catch (PDOException $e) {
            return $e;
        }
    }

public static function getUserById($userId) {
        $db = Database::getDB();
        $query = 'SELECT username, password, firstName, lastName, 
                     email, address 
                  FROM Users
                  WHERE id = :id';
        try {
            $statement = $db->prepare($query);
            $statement->bindValue(':id', $userId);
            $statement->execute();
            $row = $statement->fetch();
            $statement->closeCursor();
            $user = array('id' => $userId,
                          'username' => $row['username'],
                          'password' => $row['password'],
                          'firstName' => $row['firstName'],
                          'lastName' => $row['lastName'],
                          'email' => $row['email'],
                          'address' => $row['address']);
            return $user;
        } catch (PDOException $e) {
            return $e;
        }
    }    

    public static function addUser($username, $firstName, $lastName, $email, $password, $address = "") {
        $db = Database::getDB();
        $query = 'INSERT INTO Users
                    (username, password, firstName, lastName,
                     email, address)
                 VALUES
                    (:username, :password, :firstName, :lastName,
                     :email, :address)';
       try {
            $statement = $db->prepare($query);
            $statement->bindValue(':username', $username);
            $statement->bindValue(':password', $password);
            $statement->bindValue(':firstName', $firstName);
            $statement->bindValue(':lastName', $lastName);
            $statement->bindValue(':email', $email);
            $statement->bindValue(':address', $address);
            $statement->execute();
            $statement->closeCursor();
            return true;
       } catch (PDOException $e) {
            return false;
       }
    }
    
    
    // Not working
    public static function updateUser($id, $username, $firstName, $lastName, $email, $password, $address = "") {
        $db = Database::getDB();
        $query = 'UPDATE Users
                  SET username=:username, firstName=:firstName,
                    lastName=:lastName, email=:email, password=:password,
                    address=:address
                  WHERE id=:id';
        try {
            $statement = $db->prepare($query);
            $statement->bindValue(':id', $id);
            $statement->bindValue(':username', $username);
            $statement->bindValue(':password', $password);
            $statement->bindValue(':firstName', $firstName);
            $statement->bindValue(':lastName', $lastName);
            $statement->bindValue(':email', $email);
            $statement->bindValue(':address', $address);
            $statement->execute();
            $statement->closeCursor();
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }
}

?>