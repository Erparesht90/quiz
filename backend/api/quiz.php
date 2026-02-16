<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../controllers/QuizController.php';

$controller = new QuizController();
$method = $_SERVER['REQUEST_METHOD'];
$path_info = isset($_SERVER['PATH_INFO']) ? explode('/', trim($_SERVER['PATH_INFO'], '/')) : [];

// Route: /api/quiz.php/easy -> getQuiz('easy')
// Route: /api/quiz.php/result -> saveResult()

if ($method === 'GET' && !empty($path_info)) {
    $mode = $path_info[0];
    $controller->getQuiz($mode);
} elseif ($method === 'POST' && isset($path_info[0]) && $path_info[0] === 'result') {
    $data = json_decode(file_get_contents("php://input"), true);
    $controller->saveResult($data);
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
}
?>
