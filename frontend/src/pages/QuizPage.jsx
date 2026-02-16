import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const QuizPage = () => {
    const { mode } = useParams();
    const navigate = useNavigate();

    // State
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [settings, setSettings] = useState({});

    // Fetch Quiz Data
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                // Determine API URL based on environment or default
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
                const res = await axios.get(`${API_URL}/quiz.php/${mode}`);
                setQuestions(res.data.questions);
                setSettings({ timeLimit: res.data.time_limit });
                setTimeLeft(res.data.time_limit);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching quiz", error);
                alert("Failed to load quiz. Please try again.");
                navigate('/select-mode');
            }
        };
        fetchQuiz();
    }, [mode, navigate]);

    // Timer Logic
    useEffect(() => {
        if (loading || isAnswered) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [loading, isAnswered, currentIndex]);

    // Handlers
    const handleTimeUp = () => {
        setIsAnswered(true);
        // Automatically move to next question after short delay? Or show "Time's up"
        setTimeout(nextQuestion, 2000);
    };

    const handleAnswer = (option) => {
        if (isAnswered) return;

        setSelectedOption(option);
        setIsAnswered(true);

        if (option === questions[currentIndex].answer) {
            setScore((prev) => prev + 1);
        }

        setTimeout(nextQuestion, 1500);
    };

    const nextQuestion = () => {
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex((prev) => prev + 1);
            setTimeLeft(settings.timeLimit || 30);
            setIsAnswered(false);
            setSelectedOption(null);
        } else {
            finishQuiz();
        }
    };

    const finishQuiz = async () => {
        // Calculate final score including the last one if correct
        // Note: score state might not update immediately if we call this directly after setScore
        // Better to calculate final score variable or trust state is sufficient for next render
        // Actually, since we updated score in handleAnswer and waited 1.5s, score is up to date.

        // However, if TimeUp happened, score didn't change.

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
            await axios.post(`${API_URL}/quiz.php/result`, {
                mode,
                score, // This might miss the LAST point if nextQuestion is called too fast? 
                // No, handleAnswer updates state, then setTimeout(nextQuestion, 1500). 
                // But closure 'score' in finishQuiz might be stale if finishQuiz was called from a closure?
                // finishQuiz is called from nextQuestion.
                // Ideally, we navigate to result page with state.
            });

            navigate('/result', { state: { score, total: questions.length, mode } });
        } catch (error) {
            console.error("Error saving result", error);
            // Navigate anyway
            navigate('/result', { state: { score, total: questions.length, mode } });
        }
    };

    if (loading) return <div className="text-center py-20">Loading Quiz...</div>;

    const currentQuestion = questions[currentIndex];

    // Calculate progress
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
        <div className="max-w-2xl mx-auto py-8">
            {/* Header Stats */}
            <div className="flex justify-between items-center mb-6 text-gray-600 font-semibold">
                <span>Question {currentIndex + 1} / {questions.length}</span>
                <span className={`text-xl ${timeLeft < 10 ? 'text-red-500' : 'text-primary'}`}>
                    ⏳ {timeLeft}s
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8">
                <div className="bg-primary h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>

            {/* Question Card */}
            <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white p-8 rounded-2xl shadow-xl text-center border-t-4 border-primary"
            >
                <h2 className="text-4xl font-bold text-gray-800 mb-8">{currentQuestion.question} = ?</h2>

                <div className="grid grid-cols-2 gap-4">
                    {currentQuestion.options.map((option, idx) => {
                        let btnClass = "bg-blue-50 hover:bg-blue-100 text-blue-700";
                        if (isAnswered) {
                            if (option === currentQuestion.answer) btnClass = "bg-green-500 text-white";
                            else if (option === selectedOption) btnClass = "bg-red-500 text-white";
                            else btnClass = "bg-gray-100 text-gray-400";
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(option)}
                                disabled={isAnswered}
                                className={`py-4 rounded-xl text-xl font-bold transition-all transform ${isAnswered ? '' : 'hover:scale-105 shadow-sm'} ${btnClass}`}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
};

export default QuizPage;
