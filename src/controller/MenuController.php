<?php
class MenuController {
    private $requestMethod;
    private $productId;

    public function __construct($requestMethod, $productId) {
        $this->requestMethod = $requestMethod;
        $this->productId = $productId;
    }

    public function processRequest() {
        switch ($this->requestMethod) {
            case 'GET':
                if ($this->productId) {
                    $response = $this->getMenuItem($this->productId);
                } else {
                    $response = $this->getMenuItems();
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

    private function getMenuItems() {
        $result = ProductDB::getAllProducts();
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function getMenuItem($productId) {
        $result = ProductDB::getProduct($productId);
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