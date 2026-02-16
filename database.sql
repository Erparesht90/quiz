CREATE DATABASE IF NOT EXISTS math_quiz_db;
USE math_quiz_db;

-- 1. admins table
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. quiz_settings table
CREATE TABLE IF NOT EXISTS quiz_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mode ENUM('easy', 'hard', 'master') NOT NULL UNIQUE,
    min_number INT NOT NULL,
    max_number INT NOT NULL,
    question_count INT NOT NULL DEFAULT 10,
    time_limit INT NOT NULL DEFAULT 30, -- Time limit per question or quiz? Usually per question or total. Let's assume per question for now or total? Prompt says "Timer per question" in Step 9.
    is_enabled BOOLEAN DEFAULT TRUE
);

-- 3. quiz_results table
CREATE TABLE IF NOT EXISTS quiz_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mode ENUM('easy', 'hard', 'master') NOT NULL,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings unique per mode
INSERT INTO quiz_settings (mode, min_number, max_number, question_count, time_limit, is_enabled) VALUES
('easy', 1, 20, 10, 15, 1),
('hard', 10, 100, 10, 30, 1),
('master', 10, 1000, 10, 60, 1)
ON DUPLICATE KEY UPDATE mode=mode;
