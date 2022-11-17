<?php
class LoginController {
    private $requestMethod;

    public function __construct($requestMethod) {
        $this->requestMethod = $requestMethod;
        // $this->personGateway = new PersonGateway($db);
    }

    public function processRequest() {
        switch ($this->requestMethod) {
            case 'GET':
                $response['status_code_header'] = 'HTTP/1.1 200 OK';
                $response['body'] = "GET /register";
                break;
            case 'POST':
                $response['status_code_header'] = 'HTTP/1.1 200 OK';
                $response['body'] = "POST /login";
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

    private function notFoundResponse() {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }
}