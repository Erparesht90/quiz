# Math Quiz Backend (PHP)

This is the Core PHP backend for the Math Quiz Application.

## Requirements
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Composer (Optional, for JWT if needed, but a manual JWT class is included)

## Setup

1. **Database**:
   - Create a database named `math_quiz_db`.
   - Import the `database.sql` file located in the project root:
     ```bash
     mysql -u root -p math_quiz_db < ../database.sql
     ```
   - Update `config/Database.php` with your database credentials if they are not default (`root`, empty password).

2. **Run Server**:
   You can use the built-in PHP development server:
   ```bash
   cd backend
   php -S localhost:8000
   ```
   The API will be available at `http://localhost:8000/api`.

## API Endpoints
- **Quiz**:
  - `GET /api/quiz.php/{mode}` (easy, hard, master)
  - `POST /api/quiz.php/result`
- **Admin**:
  - `POST /api/admin.php/login`
  - `GET /api/admin.php/settings` (Requires Auth)
  - `PUT /api/admin.php/settings/{mode}` (Requires Auth)
  - `PUT /api/admin.php/toggle/{mode}` (Requires Auth)
