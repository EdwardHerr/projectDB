<?php
    include('../src/controller/RegisterController.php');
    // include('../src/controller/LoginController.php');
    
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = explode('/', $uri);
    
    if (!isset($uri[5])) {
        header("HTTP/1.1 404 Not Found");
        exit();
    } else {
        $endpoint = $uri[5];
    }
    $method = $_SERVER['REQUEST_METHOD'];

    // echo $endpoint;
    
    switch($endpoint) {
        case "register":
            $controller = new RegisterController($method);
            $controller->processRequest();
            break;
        case "login":
            // $controller = new LoginController($method);
            // $controller->processRequest();
            break;
        default:
            echo "invalid endpoint";
            break;
    }
    
?>