import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { generateQuiz } from '../utils/QuestionGenerator.js';
import AdComponent from '../components/AdComponent';

const QuizPage = () => {
    const { mode, questionId } = useParams();
    const navigate = useNavigate();
    const currentQIndex = parseInt(questionId) - 1;

    // State
    const [quizData, setQuizData] = useState(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [isMuted, setIsMuted] = useState(false);

    // Audio Refs (Using placeholder generic sounds or synth)
    const playSound = (type) => {
        if (isMuted) return;
        const synth = window.speechSynthesis;
        if (type === 'correct') {
            const u = new SpeechSynthesisUtterance("Awesome!");
            u.rate = 1.5;
            u.pitch = 1.5;
            synth.speak(u);
        } else if (type === 'wrong') {
            const u = new SpeechSynthesisUtterance("Oh no, try again next time!");
            u.rate = 1.2; 
            synth.speak(u);
        } else if (type === 'tick') {
            // Tick sound is hard with synth, maybe skip or use Audio context if needed
        }
    };

    // Initialize Quiz Data
    useEffect(() => {
        // Check session storage for existing quiz
        const cachedQuiz = sessionStorage.getItem(`quiz_${mode}`);
        if (cachedQuiz) {
            setQuizData(JSON.parse(cachedQuiz));
        } else {
            const data = generateQuiz(mode, 10);
            sessionStorage.setItem(`quiz_${mode}`, JSON.stringify(data));
            setQuizData(data);
        }
    }, [mode]);

    // Update Timer & Reset State on Question Change
    useEffect(() => {
        if (!quizData) return;
        
        // Validate index
        if (isNaN(currentQIndex) || currentQIndex < 0 || currentQIndex >= quizData.questions.length) {
            navigate('/select-mode'); // Invalid URL
            return;
        }

        setTimeLeft(quizData.time_limit);
        setIsAnswered(false);
        setSelectedOption(null);
        setFeedback(null);

    }, [currentQIndex, quizData, navigate]);

    // Timer Logic
    useEffect(() => {
        if (!quizData || isAnswered) return;

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
    }, [isAnswered, quizData, currentQIndex]);

    const handleTimeUp = () => {
        setIsAnswered(true);
        setFeedback('wrong');
        playSound('wrong');
        
        // Save state and navigate to feedback
        const currentQ = quizData.questions[currentQIndex];
        navigate(`/quiz/${mode}/${currentQIndex + 1}/result`, { 
            state: { 
                isCorrect: false, 
                answer: currentQ.answer, 
                feedback: 'wrong' 
            } 
        });
    };

    const handleAnswer = (option) => {
        if (isAnswered) return;

        setSelectedOption(option);
        setIsAnswered(true);

        const currentQ = quizData.questions[currentQIndex];
        const isCorrect = option == currentQ.answer;

        if (isCorrect) {
            const newScore = score + 1;
            setScore(newScore);
            sessionStorage.setItem(`quiz_score_${mode}`, newScore);
            setFeedback('correct');
            playSound('correct');
        } else {
            setFeedback('wrong');
            playSound('wrong');
        }

        // Navigate to Feedback set time out for user to see visual feedback on button
        setTimeout(() => {
             navigate(`/quiz/${mode}/${currentQIndex + 1}/result`, { 
                state: { 
                    isCorrect: isCorrect, 
                    answer: currentQ.answer, 
                    feedback: isCorrect ? 'correct' : 'wrong' 
                } 
            });
        }, 1000);
    };

    const handleQuit = () => {
        if (window.confirm("Are you sure you want to quit? Your progress will be lost.")) {
            sessionStorage.removeItem(`quiz_${mode}`);
            sessionStorage.removeItem(`quiz_score_${mode}`);
            navigate('/');
        }
    };

    // Removed goToNextQuestion and finishQuiz as they are handled in Feedback page now

    if (!quizData) return <div className="flex h-screen items-center justify-center text-4xl font-black text-blue-500 animate-pulse">Loading Fun... 🚀</div>;

    const currentQuestion = quizData.questions[currentQIndex];
    if (!currentQuestion) return null;

    const progress = ((currentQIndex + 1) / quizData.questions.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 py-4 px-4 font-sans select-none overflow-x-hidden">
            <div className="max-w-2xl mx-auto flex flex-col h-full">
                
                {/* Header Controls */}
                <div className="flex justify-between items-center mb-6">
                    <button onClick={handleQuit} className="px-4 py-2 bg-white rounded-2xl shadow-md border-b-4 border-gray-200 text-gray-600 font-black hover:bg-gray-50 active:translate-y-1 active:border-b-0 transition-all flex items-center gap-2">
                        <span>🏠</span> <span className="hidden sm:inline">Home</span>
                    </button>
                    <button onClick={() => setIsMuted(!isMuted)} className="px-4 py-2 bg-white rounded-2xl shadow-md border-b-4 border-gray-200 text-gray-600 font-black hover:bg-gray-50 active:translate-y-1 active:border-b-0 transition-all">
                        {isMuted ? '🔇' : '🔊'}
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="bg-white p-3 rounded-3xl shadow-lg border-2 border-blue-100 mb-6 relative">
                    <div className="flex justify-between text-xs font-black text-blue-400 mb-1 px-2 uppercase tracking-wide">
                        <span>Level {currentQIndex + 1}</span>
                        <span>{quizData.questions.length} Total</span>
                    </div>
                    <div className="w-full bg-blue-50 rounded-full h-8 overflow-hidden border border-blue-100 relative">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="bg-gradient-to-r from-blue-400 to-indigo-500 h-full rounded-full relative"
                        >
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm z-10">🚀</span>
                        </motion.div>
                    </div>
                </div>

                {/* Main Quiz Area */}
                <div className="flex-grow flex flex-col justify-center">
                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentQIndex}
                            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            exit={{ opacity: 0, scale: 1.1, rotate: 2 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border-4 border-white ring-8 ring-blue-50 relative mb-8"
                        >
                            {/* Decorative Blobs */}
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-50 blur-2xl"></div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-200 rounded-full opacity-50 blur-2xl"></div>

                            {/* Timer Bar */}
                            <div className="absolute top-0 left-0 w-full h-3 bg-gray-100">
                                <motion.div 
                                    className={`h-full ${timeLeft < 5 ? 'bg-red-500' : 'bg-green-400'}`} 
                                    animate={{ width: `${(timeLeft / quizData.time_limit) * 100}%` }}
                                    transition={{ ease: "linear", duration: 1 }}
                                />
                            </div>
                            
                            <div className="p-6 md:p-10 text-center relative z-10">
                                <h2 className="text-6xl md:text-8xl font-black text-gray-800 mb-10 mt-4 drop-shadow-sm font-comic">
                                    {currentQuestion.question}
                                </h2>

                                <div className="grid grid-cols-2 gap-4 md:gap-6">
                                    {currentQuestion.options.map((option, idx) => {
                                        let btnClass = "bg-white border-b-8 border-gray-200 text-gray-700 hover:bg-gray-50";
                                        
                                        if (isAnswered) {
                                            if (option == currentQuestion.answer) {
                                                btnClass = "bg-green-100 border-green-500 text-green-700 scale-105 border-b-8 ring-4 ring-green-200";
                                            } else if (option === selectedOption) {
                                                btnClass = "bg-red-100 border-red-500 text-red-700 opacity-60 border-b-8";
                                            } else {
                                                btnClass = "opacity-40 border-gray-100";
                                            }
                                        }

                                        return (
                                            <motion.button
                                                key={idx}
                                                whileHover={!isAnswered ? { scale: 1.05, rotate: idx % 2 === 0 ? 1 : -1 } : {}}
                                                whileTap={!isAnswered ? { scale: 0.95, borderBottomWidth: 0, translateY: 4 } : {}}
                                                onClick={() => handleAnswer(option)}
                                                disabled={isAnswered}
                                                className={`py-6 md:py-8 rounded-2xl text-3xl md:text-5xl font-black transition-all shadow-lg border-x-2 border-t-2 ${btnClass}`}
                                            >
                                                {option}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                            
                            {/* Feedback removed here as we navigate away */}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom Ad */}
                <div className="mt-auto">
                     <AdComponent className="w-full h-16 bg-white/50 rounded-xl" />
                </div>
            </div>
        </div>
    );
};

export default QuizPage;

