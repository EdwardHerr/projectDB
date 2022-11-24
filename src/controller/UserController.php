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

    private function getUserInfo($userId) {
        $result = UserDB::getUser($userID);
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