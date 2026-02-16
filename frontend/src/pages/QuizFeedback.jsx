import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AdComponent from '../components/AdComponent';

const QuizFeedback = () => {
    const { mode, questionId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    const currentIndex = parseInt(questionId, 10);
    const result = location.state || { isCorrect: false, answer: '?', feedback: 'unknown' };

    // Get total from session if possible, or assume 10 (fallback)
    const cachedQuiz = sessionStorage.getItem(`quiz_${mode}`);
    const totalQuestions = cachedQuiz ? JSON.parse(cachedQuiz).questions.length : 10;
    
    // Determine next step
    const hasMore = currentIndex < totalQuestions;

    const handleNext = () => {
        if (hasMore) {
            navigate(`/quiz/${mode}/${currentIndex + 1}`);
        } else {
            // Retrieve score for result page
            const savedScore = sessionStorage.getItem(`quiz_score_${mode}`) || 0;
            navigate('/result', { state: { score: parseInt(savedScore), total: totalQuestions, mode } });
        }
    };

    return (
        <div className={`min-h-[85vh] flex flex-col items-center justify-center p-4 text-center ${result.isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
            
            <AnimatePresence>
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="mb-8"
                >
                    <div className="text-9xl mb-4 filter drop-shadow-lg">
                        {result.isCorrect ? '🌟' : '🙈'}
                    </div>
                    <h2 className={`text-5xl md:text-6xl font-black mb-4 ${result.isCorrect ? 'text-green-600' : 'text-red-500'}`} style={{ fontFamily: '"Comic Sans MS", cursive' }}>
                        {result.isCorrect ? 'AWESOME!' : 'Oopsie!'}
                    </h2>
                    
                    {!result.isCorrect && (
                         <p className="text-2xl text-gray-600 font-bold mb-6">
                            The correct answer was <span className="text-green-600 text-3xl">{result.answer}</span>
                         </p>
                    )}
                </motion.div>
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className={`px-10 py-5 rounded-3xl text-3xl font-black text-white shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0 ${result.isCorrect ? 'bg-green-500 border-b-8 border-green-700 active:border-b-0' : 'bg-blue-500 border-b-8 border-blue-700 active:border-b-0'}`}
            >
                {hasMore ? 'NEXT ➡️' : 'FINISH 🏁'}
            </motion.button>

            {/* Large Ad Block for improved revenue */}
            <div className="mt-12 w-full max-w-4xl">
                 <AdComponent className="bg-white/80 w-full h-32 rounded-2xl shadow-sm border-2 border-dashed border-gray-300 flex items-center justify-center" />
            </div>

            {/* Fun background elements */}
            <div className="fixed top-20 left-10 text-8xl opacity-10 animate-pulse">🎉</div>
            <div className="fixed bottom-20 right-10 text-8xl opacity-10 animate-bounce">🎈</div>

        </div>
    );
};

export default QuizFeedback;
