import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdComponent from '../components/AdComponent';

const ResultPage = () => {
    const location = useLocation();
    const { score, total, mode } = location.state || { score: 0, total: 0, mode: 'unknown' };

    const percentage = total > 0 ? (score / total) * 100 : 0;

    let message = "Good Try!";
    let emoji = "🙂";
    let color = "text-yellow-500";
    
    if (percentage === 100) {
        message = "Perfect Score!";
        emoji = "🏆";
        color = "text-yellow-500";
    } else if (percentage >= 80) {
        message = "Excellent!";
        emoji = "🌟";
        color = "text-purple-500";
    } else if (percentage >= 50) {
        message = "Well Done!";
        emoji = "👍";
        color = "text-blue-500";
    } else {
        message = "Keep Practicing!";
        emoji = "💪";
        color = "text-red-500";
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-10 px-4 bg-gray-50">
            <AdComponent className="mb-8 w-full max-w-4xl h-24 bg-white" />

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full border-4 border-white ring-4 ring-blue-100"
            >
                <div className="text-8xl mb-4 animate-bounce">{emoji}</div>
                <h2 className={`text-4xl font-black ${color} mb-2`}>{message}</h2>
                <p className="text-gray-400 font-bold uppercase tracking-wider text-sm mb-8">{mode} Mode Completed</p>

                <div className="flex justify-center mb-8 relative">
                    <svg className="w-40 h-40 transform -rotate-90">
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="15"
                            fill="transparent"
                            className="text-gray-100"
                        />
                        <motion.circle
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: percentage / 100 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="15"
                            fill="transparent"
                            strokeLinecap="round"
                            className={color.replace('text', 'text')} 
                        />
                    </svg>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <span className={`text-4xl font-black ${color}`}>{Math.round(percentage)}%</span>
                    </div>
                </div>

                <p className="text-2xl text-gray-700 mb-10 font-medium">
                    You scored <strong className={color}>{score}</strong> out of <strong>{total}</strong>
                </p>

                <div className="space-y-4">
                    <Link to="/select-mode" className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-bold text-xl hover:shadow-lg transition transform hover:-translate-y-1">
                        🔄 Play Again
                    </Link>
                    <Link to="/" className="block w-full bg-gray-100 text-gray-600 py-4 rounded-xl font-bold text-xl hover:bg-gray-200 transition">
                        🏠 Back Home
                    </Link>
                </div>
            </motion.div>

            <AdComponent className="mt-8 w-full max-w-4xl h-24 bg-white" />
        </div>
    );
};

export default ResultPage;

