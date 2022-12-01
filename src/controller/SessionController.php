<?php
class SessionController {
    private $requestMethod;
    private $update;

    public function __construct($requestMethod, $update) {
        $this->requestMethod = $requestMethod;
        $this->update = $update;
    }

    public function processRequest() {
        switch ($this->requestMethod) {
            case 'GET':
                $response['status_code_header'] = 'HTTP/1.1 200 OK';
                $response['body'] = json_encode($_SESSION);
                break;
            case 'POST':
                if ($this->update) {
                    $response = $this->updateCart();
                } else {
                    $response = $this->addToCart();
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

    private function addToCart() {
        $input = json_decode(file_get_contents('php://input'));
        if (! $input->quantity || ! $input->productId) {
            $this->notFoundResponse();
        }
        $updated = false;
        foreach($_SESSION['cart'] as &$item) {
            if ($updated) {
                break;
            }
            if ($item['productId'] == $input->productId){
                $item['quantity'] += $input->quantity;
                $updated = true;
            }
        }
        if (!$updated) {
            array_push($_SESSION['cart'],array('productId' => $input->productId, 'quantity' => $input->quantity));
        }
        $body = json_encode($_SESSION['cart']);
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = $body;
        return $response;
    }

    private function updateCart() {
        $input = json_decode(file_get_contents('php://input'), true);
        // remove any items with 0 quantity
        $result = $this->removeEmptyItems($input);
        $_SESSION['cart'] = $result;
        $response['status_code_header'] = 'HTTP/1.1 200 OK';
        $response['body'] = json_encode($_SESSION['cart']);
        return $response;
    }

    private function removeEmptyItems($arr) {
        $result = $arr;
        foreach($arr as $key => $item) {
            if ($item['quantity'] === 0) {
                unset($arr[$key]);
                $result = array_values($arr);
            }
        }
        return $result;
    }
    private function notFoundResponse() {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = null;
        return $response;
    }
}