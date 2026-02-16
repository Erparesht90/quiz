# Database Structure Explanation

## Database: `math_quiz_db`

### Tables

1.  **`admins`**
    *   **Purpose**: Stores separate admin accounts for secure access to the admin panel.
    *   **Columns**:
        *   `id`: Primary Key, Auto Increment.
        *   `username`: Unique identifier for login.
        *   `password`: Bcrypt hashed password for security.
        *   `created_at`: Timestamp of account creation.

2.  **`quiz_settings`**
    *   **Purpose**: Stores configuration for each quiz difficulty mode. Allows dynamic updates without changing code.
    *   **Columns**:
        *   `id`: Primary Key.
        *   `mode`: Enum ('easy', 'hard', 'master') to identify the setting. Unique constraint ensures one row per mode.
        *   `min_number`, `max_number`: Defines the range for random number generation.
        *   `question_count`: How many questions to generate per quiz.
        *   `time_limit`: Time limit in seconds (per question).
        *   `is_enabled`: Toggle to show/hide the mode in the frontend.

3.  **`quiz_results`**
    *   **Purpose**: Stores anonymous analytics of completed quizzes to track user engagement and difficulty balance.
    *   **Columns**:
        *   `id`: Primary Key.
        *   `mode`: Difficulty mode of the played quiz.
        *   `score`: Number of correct answers.
        *   `total_questions`: Total questions in that session.
        *   `created_at`: Timestamp of completion.

### Indexes & Constraints
*   **Unique Index** on `admins.username` prevents duplicate admin users.
*   **Unique Index** on `quiz_settings.mode` ensures only one configuration set exists per difficulty level.
