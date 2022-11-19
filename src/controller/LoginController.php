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
        $res = $this->loginSuccess($input);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = $res;
        return $response;
    }

    private function validateLogin($input) {
        if (! isset($input->username)) {
            return false;
        }

        $row = UserDB::getUser($input->username);
        if (! isset($input->inputPassword)) {
            return false;
        }
        if ($row['password'] !== $input->inputPassword) {
            return false;
        }
        return true;
    }

    private function invalidLoginResponse() {
        $response['status_code_header'] = 'HTTP/1.1 401 Unauthorized';
        $response['body'] = json_encode([
            'error' => 'Invalid login information'
        ]);
        return $response;
    }

    private function loginSuccess() {
        $_SESSION['login'] = true;
        $currUser = UserDB::getUser($input->username);
        $_SESSION['user'] = new User($currUser['username'], $currUser['firstName'], $currUser['lastName'], $currUser['email'], $currUser['address']);
        return "Login successful";
    }
    private function notFoundResponse() {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }
}