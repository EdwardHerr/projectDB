<?php
require "user.php";

class UserDB {
    
    public $uName;
    public $fName;
	public $lName;
	public $email;
	public $password;
	
	function signup($POST) {

		$DB = new Database();
		$_SESSION['error'] = "";
		if(isset($_POST['uName']) && isset($_POST['fName']) && isset($_POST['lName']) && isset($_POST['email']) && isset($_POST['password']))
		{
		    $this->uName = $POST['uName'];
			$this->fName = $POST['fName'];
			$this->lName = $POST['lName'];
			$this->email = $POST['email'];
			$this->password = $POST['password'];

			//validate unique Email and sin
			$ar['email'] = $this->email;
			$ar['sin'] = $this->sin;
			$query0 = "SELECT * FROM user WHERE email = :email OR sin = :sin LIMIT 1";
			$result = $DB->read($query0,$ar);
			if(is_array($result))
			{
				$_SESSION['error'] = "email or sin already exists!";
				show($_SESSION['error']);
				return;
			}

			//$arr['fName'] = $POST['fName'];
			$arr['fName'] = $this->fName;
			//$arr['lName'] = $POST['lName'];
			$arr['lName'] = $this->lName;
			//$arr['email'] = $POST['email'];
			$arr['email'] = $this->email;
			//$arr['password'] = $POST['password'];
			$arr['password'] = $this->password;
			//$arr['contact'] = $POST['contact'];
			$arr['contact'] = $this->contact;
			//$arr['address'] = $POST['address'];
			$arr['address'] = $this->address;
			//$arr['sin'] = $POST['sin'];
			$arr['sin'] = $this->sin;
			$arr['vKey'] = md5(rand(0,1000));

			$arr2['sin'] = $this->sin;

			$query = "insert into user (firstName,lastName,password,email,contact,address,sin,vKey) values (:fName,:lName,:password,:email,:contact,:address,:sin,:vKey)";
			$query2 = "insert into foodeligibility (sin) values (:sin)";

			$data = $DB->write($query,$arr);
			$data2 = $DB->write($query2,$arr2);
			if($data && $data2)
			{
				$to = $arr['email'];
				$subject = "Email Verification";
				$message = "<h1>Thank You for creating an account with Feed The Need!!</h1><br>Please click the below link to verify your account:<br><a href='http://localhost/webProject2413/public/verifyEmail/verifyTheEmail?vKey={$arr['vKey']}'>Verify Account</a>";
				$headers = "From: singhharrry383@gmail.com \r\n";
				$headers .= "MIME-Version: 1.0" . "\r\n";
				$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
				mail($to, $subject, $message, $headers);
				header("Location:". ROOT . "login?success=registrationSuccess");
				die;
			}

		}else{
			$_SESSION['error'] = "something went wrong";
		}
	}


	function modifyProfile($POST)
	{
		$DB = new Database();

		$arr['fName'] = $POST['fName'];
		$arr['lName'] = $POST['lName'];
		$arr['email'] = $POST['email'];
		$arr['password'] = $POST['password'];
		$arr['contact'] = $POST['contact'];
		$arr['address'] = $POST['address'];
		$arr['sin'] = $POST['sin'];
		$arr['id'] = $_SESSION['id'];

		$query = "UPDATE user SET firstName =:fName, lastName =:lName, email =:email, password =:password, contact =:contact, address =:address, sin =:sin WHERE userID =:id";
		$data = $DB->write($query, $arr);
		if($data)
		{
			$_SESSION['fName'] = $POST['fName'];
			$_SESSION['lName'] = $POST['lName'];
			$_SESSION['email'] = $POST['email'];
			$_SESSION['password'] = $POST['password'];
			$_SESSION['sin'] = $POST['sin'];
			$_SESSION['address'] = $POST['address'];
			$_SESSION['contact'] = $POST['contact'];
			$_SESSION['id'] = $_SESSION['id'];
			//header("Location:". ROOT . "RegUserHome");
			//die;
		}else{
			show("Something went wrong !");
		}

	}

	function addFoodRequest($POST) {

			$DBase = new Database();

			$arr['customerID'] = $_SESSION['id'];

			$query = "insert into package (customerID) values (:customerID)";
			$DB = $DBase->db_connect();
			$stm = $DB->prepare($query);
			$check = $stm->execute($arr);

	    $last_id = $DB->lastInsertId();

			if($last_id != null)
	    {
	      $array = $POST["food_options"];
	      $arr2['packageID'] = $last_id;
	      for ($x = 0; $x < count($array); $x+=3) {
	        $arr2['itemID'] = $array[$x];
	        $arr2['itemQuantity'] = $array[$x + 2];

	        $query2 = "insert into orderdetails (packageID,itemID,itemQuantity) values (:packageID,:itemID,:itemQuantity)";
	        $data2 = $DBase->write($query2, $arr2);
	      }
	    }

			if($data2) {
				for ($x = 0; $x < count($array); $x+=3) {
	        $arr3['itemID'] = $array[$x];
	        $arr3['itemQuantity'] = $array[$x + 2];
	        $query3 = "UPDATE inventory SET availableQuantity = availableQuantity - :itemQuantity WHERE itemID =:itemID";
	        $data3 = $DBase->write($query3, $arr3);
	      }

			}

			if($data3) {
				if(isset($_SESSION['itemTurn'])) {
	        unset($_SESSION['itemTurn']);
	      }
	      if(isset($_SESSION['orderItem1ID'])) {
	        unset($_SESSION['orderItem1ID']);
	      }
	      if(isset($_SESSION['orderItem2ID'])) {
	        unset($_SESSION['orderItem2ID']);
	      }
	      if(isset($_SESSION['orderItem1Name'])) {
	        unset($_SESSION['orderItem1Name']);
	      }
	      if(isset($_SESSION['orderItem2Name'])) {
	        unset($_SESSION['orderItem2Name']);
	      }
				$_SESSION['orderSuccess'] = "success";

			}
		}
		
		function login($POST) {
		$DB = new Database();

		$_SESSION['error'] = "";
		if(isset($POST['email']) && isset($POST['password']))
		{

			$arr['email'] = $POST['email'];
			$arr['password'] = $POST['password'];

			$query = "select * from user where email = :email && password = :password limit 1";
			$data = $DB->read($query,$arr);
			if(is_array($data))
			{
 				//logged in
				$_SESSION['fName'] = $data[0]->firstName;
				$_SESSION['lName'] = $data[0]->lastName;
 				$_SESSION['email'] = $data[0]->email;
				$_SESSION['password'] = $data[0]->password;
				$_SESSION['sin'] = $data[0]->sin;
				$_SESSION['address'] = $data[0]->address;
				$_SESSION['contact'] = $data[0]->contact;
				$_SESSION['user_type'] = $data[0]->userType;
				$_SESSION['verified'] = $data[0]->verified;
				$_SESSION['id'] = $data[0]->userID;
				if($_SESSION['verified'] == 0){
					$_SESSION['warning'] = "your email is not verified yet! check your mail box";
				}

				if($_SESSION['user_type'] == "regular"){
					header("Location:". ROOT . "regUserHome");
				}
				elseif ($_SESSION['user_type'] == "employee") {
					header("Location:". ROOT . "employeeHome");
				}
				elseif ($_SESSION['user_type'] == "admin") {
					header("Location:". ROOT . "adminHome");
				}
				die;

			}else{

				$_SESSION['error'] = "wrong username or password";
				show($_SESSION['error']);
			}
		}else{

			$_SESSION['error'] = "please enter a valid username and password";
		}

	}

	function logout() {
		unset($_SESSION['email']);
		unset($_SESSION['user_type']);
		unset($_SESSION['verified']);
		unset($_SESSION['fName']);
		unset($_SESSION['lName']);
		unset($_SESSION['password']);
		unset($_SESSION['sin']);
		unset($_SESSION['address']);
		unset($_SESSION['contact']);
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
