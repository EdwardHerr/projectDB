<?php
class CreditCardDB {   
    
    private static function loadCreditCard($row) {
    $creditcard = new CreditCard(
                   $row['username'],
                   $row['firstName'],
                   $row['lastName'],
                   $row['cardType'],
                   $row['cardNumber'],
                   $row['expiryDate'],
                   $row['billingAddress']);
    return $creditcard;
    }
    
    public static function getCreditCard($cardNumber) {
        $db = Database::getDB();
        $query = 'SELECT username, firstName, lastName, cardType, cardNumber,
                  expiryDate, billingAddress
                  FROM CreditCards
                  WHERE cardNumber = :cardNumber';
        try {
            $statement = $db->prepare($query);
            $statement->bindValue($cardNumber);
            $statement->execute();
            
            $row = $statement->fetch();
            $statement->closeCursor();
       
            return self::loadCreditCard($row);
        } catch (PDOException $e) {
            Database::displayError($e->getMessage());
        }
    }
    
       #ADD CREDIT CARD
       public static function addCreditCard($creditcard) {
        $db = Database::getDB();
        $query = 'INSERT INTO CreditCards
                    (username, firstName, lastName, cardType, cardNumber, expiryDate, billingAddress)
                 VALUES
                    (:username, :firstName, :lastName, :cardType, :cardNumber, :expiryDate, :billingAddress, NOW())';
       try {
           $statement = $db->prepare($query);
           $statement->bindValue(':cardNumber', $creditcard->getCardNumber());
           $statement->bindValue(':firstName', $creditcard->getFirstName());
           $statement->bindValue(':lastName', $creditcard->getLastName());
           $statement->bindValue(':username', $creditcard->getUserName());
           $statement->bindValue(':cardType', $creditcard->getcardType());
           $statement->bindValue(':expiryDate', $creditcard->getExpiryDate());
           $statement->bindValue(':billingAddress', $creditcard->getbillingAddress());
           
           $statement->execute();
           $statement->closeCursor();

           return $creditcard -> getUserName();
       } catch (PDOException $e) {
           Database::displayError($e->getMessage());
       }
    }
    
    public static function updateCreditCard($creditcard) {
        $db = Database::getDB();
        $query = 'UPDATE CreditCards
                  SET username = :username, firstName = :firstName,
                      lastName = :lastName, card_number = :card_number,
                      billingAddress = billingAddress, expiryDate = :expiryDate
                  WHERE card_number = :card_number';
        try {
            $statement = $db->prepare($query);
            $statement->bindValue(':cardNumber', $creditcard->getCardNumber());
            $statement->bindValue(':username', $creditcard->getUserName());
            $statement->bindValue(':firstName', $creditcard->getFirstName());
            $statement->bindValue(':lastName', $creditcard->getLastName());
            $statement->bindValue(':cardType', $creditcard->getcardType());
            $statement->bindValue(':expiryDate', $creditcard->getExpiryDate());
            $statement->bindValue(':billingAddress', $creditcard->getbillingAddress());
            
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