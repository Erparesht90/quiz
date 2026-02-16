<?php
require_once '../config/Database.php';
require_once '../utils/QuestionGenerator.php';

class QuizController {
    private $db;
    private $conn;

    public function __construct() {
        $this->db = new Database();
        $this->conn = $this->db->getConnection();
    }

    public function getQuiz($mode) {
        if (!in_array($mode, ['easy', 'hard', 'master'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid quiz mode']);
            return;
        }

        $query = "SELECT * FROM quiz_settings WHERE mode = :mode AND is_enabled = 1";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':mode', $mode);
        $stmt->execute();
        
        $settings = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$settings) {
            http_response_code(404);
            echo json_encode(['error' => 'Quiz mode not found or disabled']);
            return;
        }

        $generator = new QuestionGenerator();
        $questions = [];

        for ($i = 0; $i < $settings['question_count']; $i++) {
            $questions[] = $generator->generate($mode);
        }

        echo json_encode([
            'mode' => $mode,
            'time_limit' => $settings['time_limit'],
            'questions' => $questions
        ]);
    }

    public function saveResult($data) {
        if (!isset($data['mode']) || !isset($data['score']) || !isset($data['total_questions'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            return;
        }

        $query = "INSERT INTO quiz_results (mode, score, total_questions) VALUES (:mode, :score, :total)";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':mode', $data['mode']);
        $stmt->bindParam(':score', $data['score']);
        $stmt->bindParam(':total', $data['total_questions']);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(['message' => 'Result saved successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to save result']);
        }
    }
}
?>
