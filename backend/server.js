const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('Math Quiz API is running...');
});

// Import Routes (will be created in next steps)
const quizRoutes = require('./routes/quiz.routes');
const adminRoutes = require('./routes/admin.routes');
app.use('/api/quiz', quizRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
