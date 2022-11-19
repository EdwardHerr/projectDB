<?php
    $lifetime = 60 * 60 * 24 * 14;    // 2 weeks in seconds
    session_set_cookie_params($lifetime, '/');
    session_start();
    if (empty($_SESSION['login'])) {
        $_SESSION['loggedIn'] = false;
    }
    if (empty($_SESSION['user'])) {
        $_SESSION['user'] = null;
    }

    include('../src/controller/RegisterController.php');
    include('../src/controller/LoginController.php');
    include('../src/model/Database.php');
    include('../src/model/User.php');
    include('../src/model/UserDB.php');
    // include('../src/model/Product.php');
    // include('../src/model/ProductDB.php');
    
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = explode('/', $uri);
    
    if (!isset($uri[4])) {
        header("HTTP/1.1 404 Not Found");
        exit();
    } else {
        $endpoint = $uri[4];
    }
    $method = $_SERVER['REQUEST_METHOD'];
    
    switch($endpoint) {
        case "register":
            $controller = new RegisterController($method);
            $controller->processRequest();
            break;
        case "login":
            $controller = new LoginController($method);
            $controller->processRequest();
            break;
        default:
            echo "invalid endpoint";
            break;
    }
    
?>