<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../controllers/AdminController.php';

$controller = new AdminController();
$method = $_SERVER['REQUEST_METHOD'];
$path_info = isset($_SERVER['PATH_INFO']) ? explode('/', trim($_SERVER['PATH_INFO'], '/')) : [];

// Route: POST /api/admin.php/login
// Route: GET /api/admin.php/settings
// Route: PUT /api/admin.php/settings/:mode
// Route: PUT /api/admin.php/toggle/:mode

$data = json_decode(file_get_contents("php://input"), true);

if (empty($path_info)) {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
    exit;
}

if ($method === 'POST' && $path_info[0] === 'login') {
    $controller->login($data);
} elseif ($method === 'GET' && $path_info[0] === 'settings') {
    $controller->getSettings();
} elseif ($method === 'PUT' && $path_info[0] === 'settings' && isset($path_info[1])) {
    $controller->updateSettings($path_info[1], $data);
} elseif ($method === 'PUT' && $path_info[0] === 'toggle' && isset($path_info[1])) {
    $controller->toggleQuizMode($path_info[1]);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
}
?>
