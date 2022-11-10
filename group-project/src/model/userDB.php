<?php

class userDB {
    
    public $uName;
    public $fName;
	public $lName;
	public $email;
	public $password;
	
	function signup($POST) {

		$DB = new Database();
		$_SESSION['error'] = "";
		if(isset($_POST['uName']) && isset($_POST['fName']) && isset($_POST['lName']) && isset($_POST['email']) && isset($_POST['password'])) {
		    $this->uName = $POST['uName'];
			$this->fName = $POST['fName'];
			$this->lName = $POST['lName'];
			$this->email = $POST['email'];
			$this->password = $POST['password'];

			$arr['uName'] = $this->uName;
			$arr['fName'] = $this->fName;
			$arr['lName'] = $this->lName;
			$arr['email'] = $this->email;
			$arr['password'] = $this->password;

			$query = "insert into user (userName,firstName,lastName,password,email) values (:uName,:fName,:lName,:password,:email)";

			$data = $DB->write($query,$arr);

			if($data)
			{
				$to = $arr['email'];
				$subject = "Email Verification";
				$message = "<h1>Thank You for creating an account with House of Pasta!</h1>";
				header("Location:". ROOT ."login?success=registartionSuccess");
				die;
			}

		}else{
			$_SESSION['error'] = "something went wrong";
		}
	}


	function modifyAccount($POST) {
		
		$DB = new Database();

		$arr['uName'] = $POST['uName'];
		$arr['fName'] = $POST['fName'];
		$arr['lName'] = $POST['lName'];
		$arr['email'] = $POST['email'];
		$arr['password'] = $POST['password'];
		$arr['id'] = $_SESSION['id'];

		$query = "UPDATE user SET userName =:uName, firstName =:fName, lastName =:lName, email =:email, password =:password, WHERE userID =:id";
		$data = $DB->write($query, $arr);
		if($data) {
			
			$_SESSION['uName'] = $POST['uName'];
			$_SESSION['fName'] = $POST['fName'];
			$_SESSION['lName'] = $POST['lName'];
			$_SESSION['email'] = $POST['email'];
			$_SESSION['password'] = $POST['password'];
			$_SESSION['id'] = $_SESSION['id'];
			
		} else {
			show("Something went wrong !");
		}

	}
		
		function login($POST) {
		
		$DB = new Database();

		$_SESSION['error'] = "";
		if(isset($POST['uName']) && isset($POST['password'])) {

			$arr['uName'] = $POST['uName'];
			$arr['password'] = $POST['password'];

			$query = "select * from user where userName = :uName && password = :password limit 1";
			$data = $DB->read($query,$arr);
			if(is_array($data)) {
 				
 				//logged in
 				$_SESSION['uName'] = $data[0]->userName;
				$_SESSION['fName'] = $data[0]->firstName;
				$_SESSION['lName'] = $data[0]->lastName;
 				$_SESSION['email'] = $data[0]->email;
				$_SESSION['password'] = $data[0]->password;
				$_SESSION['id'] = $data[0]->userID;
				die;

			} else {

				$_SESSION['error'] = "wrong username or password";
				show($_SESSION['error']);
			}
		} else {

			$_SESSION['error'] = "please enter a valid username and password";
		}

	}

	function logout() {
		
		unset($_SESSION['email']);
		unset($_SESSION['uName']);
		unset($_SESSION['fName']);
		unset($_SESSION['lName']);
		unset($_SESSION['password']);
		unset($_SESSION['id']);

		header("Location:". ROOT . "home");
		die;
	}

	function getUser($id) {
		$DB = new Database();
		$arr['userID'] = $id;

		$query = "select * from user where userID = :userID LIMIT 1";
		$data = $DB->readAll($query,$arr);
		if(is_array($data))
		{
			return $data;
		}
		else {
			die("something went wrong!");
		}
	}
}
