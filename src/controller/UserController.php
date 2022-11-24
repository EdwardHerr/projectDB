<?php
class UserController {
    private $requestMethod;
    private $userId;

    public function __construct($requestMethod, $userId) {
        $this->requestMethod = $requestMethod;
        $this->userId = $userId;
    }

    public function processRequest() {
        switch ($this->requestMethod) {
            case 'POST':
                $response = $this->updateUserInfo();
                break;
            case 'GET':
                if ($this->userId) {
                    $response = $this->getUserInfo($this->userId);
                };
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
    
    private function updateUserInfo($userId) {
        $input = json_decode(file_get_contents('php://input'));
        if (! $this->validateUser($input)) {
            return $this->invalidUserResponse();
        }
        $res = $this->UserDB::updateUser($input);
            if ($res) {
                $response['status_code_header'] = 'HTTP/1.1 201 Created';
                $body = "Update successful!";
            } else {
                $response['status_code_header'] = 'HTTP/1.1 400 Bad Request';
                $body = json_encode([
                    'error' => 'Unable to update account'
                ]);
            }
            $response['body'] = $body;
            return $response;
    }
    
    
    private function validateUser($input) {
        if (! isset($input->username) || strlen($input->username) < 1) {
            return false;
        }
        if (! isset($input->firstName) || strlen($input->firstName) < 1) {
            return false;
        }
        if (! isset($input->lastName) || strlen($input->lastName) < 1) {
            return false;
        }
        if (! isset($input->inputEmail) || strlen($input->inputEmail) < 1) {
            return false;
        }
        if (! isset($input->inputAddress) || strlen($input->inputAddress) < 1) {
            return false;
        }
        if (! isset($input->inputPassword) || strlen($input->inputPassword) < 1) {
            return false;
        }
        if (! isset($input->confirmPassword) || strlen($input->confirmPassword) < 1) {
            return false;
        }
        if ($input->confirmPassword !== $input->inputPassword) {
            return false;
        }
        return true;
    }
    
    private function invalidUserResponse() {
        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = json_encode([
            'error' => 'Invalid User'
        ]);
        return $response;
    }

    private function getUserInfo($userId) {
        $result = UserDB::getUserById($userID);
        if (! $result) {
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }
    
    
    private function notFoundResponse() {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }
}
?>