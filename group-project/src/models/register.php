        <?php
        $db = Database::getDB();
         
        $first_name = filter_input($INPUT_POST, 'first_name');
        $last_name = filter_input($INPUT_POST, 'last_name');
        $username = filter_input($INPUT_POST, 'username');
        $password = filter_input($INPUT_POST, 'password');
        $email = filter_input($INPUT_POST, 'email');
        $address = filter_input($INPUT_POST, 'address');
  
        //Performing insert query execution
        $sql = "INSERT INTO Users VALUES ('$first_name',
            '$last_name','$password','$address','$email', '$address')";
         
        // Close connection
        mysqli_close($conn);
        ?>