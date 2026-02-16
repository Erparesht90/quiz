const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/login', adminController.login);
router.post('/create-initial', adminController.createAdmin);

// Protected Routes
router.get('/settings', authMiddleware, adminController.getSettings);
router.put('/settings/:mode', authMiddleware, adminController.updateSettings);
router.put('/toggle/:mode', authMiddleware, adminController.toggleQuizMode);

module.exports = router;
