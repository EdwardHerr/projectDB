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
                if ($this->userId) {
                    $response = $this->updateUserInfo($this->userId);
                } else {
                    $response['status_code_header'] = "HTTP/1.1 400 Bad Request";
                    $response['body'] = json_encode([
                        'error' => 'hmm']);
                }
                break;
            case 'GET':
                if ($this->userId) {
                    $response = $this->getUserInfo($this->userId);
                } else {
                    $response['status_code_header'] = "HTTP/1.1 400 Bad Request";
                    $response['body'] = json_encode([
                        'error' => 'hmm']);
                }
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
        $res = $this->updateUser($userId,
                                 $input->username,
                                 $input->firstName,
                                 $input->lastName,
                                 $input->inputEmail,
                                 $input->inputPassword,
                                 $input->address);
            if ($res) {
                $response['status_code_header'] = 'HTTP/1.1 200 OK';
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
    
    private function getUserInfo($userId) {
        $result = UserDB::getUserById($userId);
        if (! $result) {
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }
    
    private function updateUser($input) {
        return UserDB::updateUser($this->id, $this->username. $this->firstName, $this->lastName, $this->inputEmail, $this->inputPassword, $this->address);
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
        if (! isset($input->inputPassword) || strlen($input->inputPassword) < 1) {
            return false;
        }
        if (! isset($input->confirmPassword) || strlen($input->confirmPassword) < 1) {
            return false;
        }
        if ($input->confirmPassword !== $input->inputPassword) {
            return false;
        }
        if (! isset($input->address) || strlen($input->address) < 1) {
            return false;
        }
        return true;
    }
    
    
    private function invalidUserResponse() {
        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = json_encode([
            'error' => 'Invalid User Information'
        ]);
        return $response;
    }
    
    private function notFoundResponse() {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }
}
?>