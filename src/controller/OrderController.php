<?php
class OrderController {
    private $requestMethod;
    private $orderId;
    private $userId;

    public function __construct($requestMethod, $params) {
        $this->requestMethod = $requestMethod;
        $this->orderId = $params['orderId'];
        $this->userId = $params['userId'];
    }

    public function processRequest() {
        switch ($this->requestMethod) {
            case 'GET':
                if ($this->orderId) {
                    $response = $this->getOrderData($this->userId, $this->orderId);
                } else if ($this->userId) {
                    $response = $this->getAllOrderData($this->userId);
                }
                break;
            case 'POST':
                $response = $this->addOrder($this->userId);
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

    private function getAllOrderData($userId) {
        $result = OrderDB::getAllOrders($userId);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }

    private function getOrderData($userId, $orderId) {
        $result = OrderDB::getOrderById($userId, $orderId);
        if (! $result) {
            return $this->notFoundResponse();
        }
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($result);
        return $response;
    }
    
    private function addOrder($userId) {
        $input = json_decode(file_get_contents('php://input'));
        $orderDate = $input->orderDate;
        $products = $input->products;
        $result = OrderDB::addOrder($userId, $orderDate, $products);
        if ($result) {
            $response['status_code_header'] = 'HTTP/1.1 200 OK';
        } else {
            $response['status_code_header'] = 'HTTP/1.1 400 Bad Request';
        }
        
        $response['body'] = $result;
        return $response;
    }
    
    private function notFoundResponse() {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }
}
?>