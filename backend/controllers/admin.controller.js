const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// POST /api/admin/login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Please provide username and password' });
    }

    try {
        const [admins] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);

        if (admins.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const admin = admins[0];
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.json({ token, message: 'Login successful' });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// For initial setup only
exports.createAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO admins (username, password) VALUES (?, ?)', [username, hashedPassword]);
        res.status(201).json({ message: 'Admin created' });
    } catch (error) {
        // Get all quiz settings
        exports.getSettings = async (req, res) => {
            try {
                const [settings] = await db.query('SELECT * FROM quiz_settings');
                res.json(settings);
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };

        // Update quiz settings
        exports.updateSettings = async (req, res) => {
            const { mode } = req.params;
            const { min_number, max_number, question_count, time_limit } = req.body;

            try {
                await db.query(
                    'UPDATE quiz_settings SET min_number = ?, max_number = ?, question_count = ?, time_limit = ? WHERE mode = ?',
                    [min_number, max_number, question_count, time_limit, mode]
                );
                res.json({ message: 'Settings updated successfully' });
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };

        // Toggle quiz mode
        exports.toggleQuizMode = async (req, res) => {
            const { mode } = req.params;

            try {
                // Toggle logic: get current status first or use bitwise NOT if supported, but let's be explicit
                // Using a CASE statement or just fetching first. Let's use simplified update.
                await db.query('UPDATE quiz_settings SET is_enabled = NOT is_enabled WHERE mode = ?', [mode]);
                res.json({ message: 'Quiz mode toggled successfully' });
            } catch (error) {
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
