<?php

class UserDB {

 private static function loadUser($row) {
     $user = new User($row['username'],
                      $row['password'],
                      $row['firstName'],
                      $row['lastName'],
                      $row['email'],
                      $row['address']);
    return $user;
 }
    
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
            
            // return self::loadUser($row);
            return $row;
        } catch (PDOException $e) {
            Database::displayError($e->getMessage());
        }
    }

    public static function addUser($user) {
        $db = Database::getDB();
        $query = 'INSERT INTO Users
                    (username, password, firstName, lastName,
                     email, address)
                 VALUES
                    (:username, :password, :firstName, :lastName,
                     :email, :address)';
       try {
           $statement = $db->prepare($query);
           $statement->bindValue(':username', $user->getUserName());
           $statement->bindValue(':password', $user->getPassword());
           $statement->bindValue(':firstName', $user->getFirstName());
           $statement->bindValue(':lastName', $user->getLastName());
           $statement->bindValue(':email', $user->getEmail());
           $statement->bindValue(':address', $user->getAddress());
           $statement->execute();
           $statement->closeCursor();

           
        //   return $user->getUserName();
            return "Registration Successful";
       } catch (PDOException $e) {
        //   Database::displayError($e->getMessage());
            return "Unable to add user";
       }
    }
    
    public static function updateUser($user) {
        $db = Database::getDB();
        $query = 'UPDATE Users
                  SET username = :username, firstName = :firstName,
                      lastName = :lastName, email = :email,
                      address = :address, password = :password
                  WHERE id = :id';
        try {
            $statement = $db->prepare($query);
            $statement->bindValue(':username', $user->getID());
            $statement->bindValue(':username', $user->getUserName());
            $statement->bindValue(':password', $user->getPassword());
            $statement->bindValue(':firstName', $user->getFirstName());
            $statement->bindValue(':lastName', $user->getLastName());
            $statement->bindValue(':email', $user->getEmail());
            $statement->bindValue(':address', $user->getAddress());
            $statement->execute();
            
            $row_count = $statement->rowCount();
            $statement->closeCursor();
            return $row_count;
        } catch (PDOException $e) {
            Database::displayError($e->getMessage());
        }
    }
}

?>