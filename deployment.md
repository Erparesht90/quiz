# Math Quiz Application Deployment Guide

## Prerequisites
- **Node.js**: v18+
- **MySQL**: v8.0+
- **Domain Name**: For production access.
- **VPS/Cloud Server**: AWS, DigitalOcean, Heroku, or similar.

## 1. Database Setup
1. Log in to your MySQL server.
2. Create the database and tables using the provided SQL script:
   ```bash
   mysql -u root -p < database.sql
   ```
3. Verify the `admins` table exists.
4. (Optional) Insert an initial admin user manually if needed, or use the `/api/admin/create-initial` endpoint (delete this endpoint after use for security).

## 2. Backend Deployment
1. Navigate to `backend/`.
2. Install dependencies:
   ```bash
   npm install --production
   ```
3. Create a `.env` file with production values:
   ```env
   PORT=5000
   DB_HOST=your-db-host
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_NAME=math_quiz_db
   JWT_SECRET=your-secure-secret-key
   ```
4. Start the server using a process manager like PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "math-quiz-api"
   pm2 save
   pm2 startup
   ```

## 3. Frontend Deployment
1. Navigate to `frontend/`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project for production:
   ```bash
   npm run build
   ```
   This will create a `dist/` folder.
4. Serve the `dist/` folder using a static file server (e.g., Nginx, Apache, or serve).
   
   **Using Nginx (Recommended):**
   - Install Nginx.
   - Configure a server block to point to `d:\quiz\frontend\dist` (or wherever you uploaded it).
   - Set up reverse proxy for `/api` to `localhost:5000`.

   **Example Nginx Config:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           root /var/www/math-quiz/frontend/dist;
           index index.html;
           try_files $uri $uri/ /index.html;
       }

       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 4. Security Checklist
- [ ] Change `JWT_SECRET` in `.env`.
- [ ] Ensure MySQL is not exposed to the public internet (use a firewall).
- [ ] Enable HTTPS using Let's Encrypt (Certbot).
- [ ] Remove the `/create-initial` route from `admin.routes.js` after creating the first admin.
- [ ] Update `AdSense` client ID in `index.html` and `AdBanner.jsx`.

## 5. Maintenance
- Monitor logs with `pm2 logs`.
- Backup database regularly using `mysqldump`.
