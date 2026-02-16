<?php
require_once '../config/Database.php';
require_once '../utils/JWT.php';

class AdminController {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    public function login($data) {
        if (!isset($data['username']) || !isset($data['password'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Please provide username and password']);
            return;
        }

        $query = "SELECT * FROM admins WHERE username = :username";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':username', $data['username']);
        $stmt->execute();

        $admin = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($admin && password_verify($data['password'], $admin['password'])) {
            $payload = [
                'id' => $admin['id'],
                'username' => $admin['username'],
                'exp' => time() + (60 * 60 * 24) // 1 day
            ];
            $token = JWT::encode($payload);
            echo json_encode(['token' => $token, 'message' => 'Login successful']);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid credentials']);
        }
    }

    // Middleware to verify token
    public function authorize() {
        $headers = apache_request_headers();
        $token = null;

        if (isset($headers['Authorization'])) {
            $token = str_replace('Bearer ', '', $headers['Authorization']);
        }

        if (!$token) {
            http_response_code(401);
            echo json_encode(['error' => 'Access Denied. No token provided.']);
            exit;
        }

        $decoded = JWT::decode($token);
        if (!$decoded) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid Token']);
            exit;
        }
        return $decoded; // Return user info
    }

    public function getSettings() {
        $this->authorize(); // Protect route

        $query = "SELECT * FROM quiz_settings";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        
        $settings = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($settings);
    }

    public function updateSettings($mode, $data) {
        $this->authorize();

        $query = "UPDATE quiz_settings SET min_number = :min, max_number = :max, question_count = :count, time_limit = :time WHERE mode = :mode";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':min', $data['min_number']);
        $stmt->bindParam(':max', $data['max_number']);
        $stmt->bindParam(':count', $data['question_count']);
        $stmt->bindParam(':time', $data['time_limit']);
        $stmt->bindParam(':mode', $mode);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Settings updated successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update settings']);
        }
    }

    public function toggleQuizMode($mode) {
        $this->authorize();

        $query = "UPDATE quiz_settings SET is_enabled = NOT is_enabled WHERE mode = :mode";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':mode', $mode);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Quiz mode toggled successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to toggle mode']);
        }
    }
}
?>
