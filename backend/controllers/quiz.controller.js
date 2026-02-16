const db = require('../config/db');
const { generateQuestion } = require('../utils/questionGenerator');

// GET /api/quiz/:mode
exports.getQuiz = async (req, res) => {
    const { mode } = req.params;

    if (!['easy', 'hard', 'master'].includes(mode)) {
        return res.status(400).json({ error: 'Invalid quiz mode' });
    }

    try {
        const [settings] = await db.query('SELECT * FROM quiz_settings WHERE mode = ? AND is_enabled = 1', [mode]);

        if (settings.length === 0) {
            return res.status(404).json({ error: 'Quiz mode not found or disabled' });
        }

        const { question_count, time_limit } = settings[0];
        const questions = [];

        for (let i = 0; i < question_count; i++) {
            questions.push(generateQuestion(mode));
        }

        res.json({
            mode,
            time_limit,
            questions
        });

    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// POST /api/quiz/result
exports.saveResult = async (req, res) => {
    const { mode, score, total_questions } = req.body;

    if (!mode || score === undefined || !total_questions) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await db.query('INSERT INTO quiz_results (mode, score, total_questions) VALUES (?, ?, ?)',
            [mode, score, total_questions]);

        res.status(201).json({ message: 'Result saved successfully' });
    } catch (error) {
        console.error('Error saving result:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
