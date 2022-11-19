<?php
class RegisterController {
    private $requestMethod;

    public function __construct($requestMethod) {
        $this->requestMethod = $requestMethod;
    }

    public function processRequest() {
        switch ($this->requestMethod) {
            case 'POST':
                $response = $this->createUserFromRequest();
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
    private function createUserFromRequest() {
            $input = json_decode(file_get_contents('php://input'));
            if (! $this->validatePerson($input)) {
                return $this->unprocessableEntityResponse();
            }
            $res = $this->createPerson($input);
            $response['status_code_header'] = 'HTTP/1.1 201 Created';
            $response['body'] = $res;
            return $response;
        }
        
    private function validatePerson($input) {
        if (! isset($input->username)) {
            return false;
        }
        if (! isset($input->firstName)) {
            return false;
        }
        if (! isset($input->lastName)) {
            return false;
        }
        if (! isset($input->inputEmail)) {
            return false;
        }
        if (! isset($input->inputPassword)) {
            return false;
        }
        if (! isset($input->confirmPassword)) {
            return false;
        }
        if ($input->confirmPassword !== $input->inputPassword) {
            return false;
        }
        return true;
    }
    
    private function unprocessableEntityResponse() {
        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = json_encode([
            'error' => 'Invalid input'
        ]);
        return $response;
    }

    private function notFoundResponse() {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }
    
    private function createPerson($input) {
        $newUser = new User($input->username,
                           $input->firstName,
                           $input->lastName,
                           $input->inputEmail,
                           $input->inputPassword);
        return UserDB::addUser($newUser);
        // return $newUser->getUsername();
    }   
}