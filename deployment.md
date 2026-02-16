# Math Quiz Application Deployment Guide

## Prerequisites
- **PHP**: v7.4+
- **MySQL**: v8.0+
- **Web Server**: Apache or Nginx
- **Domain Name**: For production access.

## 1. Database Setup
1. Log in to your MySQL server.
2. Create the database and tables using the provided SQL script:
   ```bash
   mysql -u root -p < database.sql
   ```
3. Verify the `admins` table exists.
4. (Optional) Insert an initial admin user manually if needed, or use the `/api/admin/create-initial` endpoint (delete this endpoint after use for security).

## 2. Backend Deployment (PHP)
1. Upload the `backend/` folder to your server (e.g., `/var/www/html/api`).
2. Update `config/Database.php` with production DB credentials.
3. Configure your Web Server (Apache/Nginx) to serve the `backend` directory.
   - Ensure `.htaccess` (if using Apache) or `nginx.conf` handles requests correctly.
   - For this simple setup, direct access to `api/quiz.php` works without rewrites.
4. **Important**: Change the `secret_key` in `utils/JWT.php` to a strong random string.

## 3. Frontend Deployment
1. Navigate to `frontend/`.
2. Update `.env` to point to your production PHP API URL:
   ```env
   VITE_API_URL=https://yourdomain.com/api
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the project for production:
   ```bash
   npm run build
   ```
5. Serve the `dist/` folder using Nginx/Apache.

## 4. Security Checklist
- [ ] Change `secret_key` in `utils/JWT.php`.
- [ ] Ensure MySQL is secure.
- [ ] Enable HTTPS using Let's Encrypt.
- [ ] Update `AdSense` client ID in `index.html`.

## 5. Maintenance
- Monitor logs with `pm2 logs`.
- Backup database regularly using `mysqldump`.
