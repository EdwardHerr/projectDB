<?php
class LoginController {
    private $requestMethod;

    public function __construct($requestMethod) {
        $this->requestMethod = $requestMethod;
    }

    public function processRequest() {
        switch ($this->requestMethod) {
            case 'POST':
                $response = $this->login();
                break;
            default:
                $response = $this->notFoundResponse();
                break;
        }
        
        header($response['status_code_header']);
        if ($response['body']) {
            echo $response['body'];
        }
    }

    private function login() {
        $input = json_decode(file_get_contents('php://input'));
        if (! $this->validateLogin($input)) {
            return $this->invalidLoginResponse();
        }
        $body = $this->loginSuccess();
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = $body;
        return $response;
    }

    private function validateLogin($input) {
        if (! isset($input->username) || strlen($input->username) < 1) {
            return false;
        }
        if (! isset($input->inputPassword) || strlen($input->inputPassword) < 1) {
            return false;
        }
        $row = UserDB::getUser($input->username);
        if ($input->inputPassword !== $row['password']) {
            return false;
        }
        return true;
    }

    private function invalidLoginResponse() {
        $response['status_code_header'] = 'HTTP/1.1 401 Unauthorized';
        $response['body'] = $response['body'] = json_encode([
            'error' => 'Invalid login'
        ]);
        return $response;
    }

    private function loginSuccess() {
        $_SESSION['login'] = true;
        $currUser = UserDB::getUser($input->username);
        $_SESSION['user'] = new User($currUser['username'], $currUser['firstName'], $currUser['lastName'], $currUser['email'], $currUser['address']);
        return "Login Successful!";
    }
    private function notFoundResponse() {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }
}