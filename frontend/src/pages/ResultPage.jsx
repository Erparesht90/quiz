import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ResultPage = () => {
    const location = useLocation();
    const { score, total, mode } = location.state || { score: 0, total: 0, mode: 'unknown' };

    const percentage = total > 0 ? (score / total) * 100 : 0;

    let message = "Good Try!";
    if (percentage >= 80) message = "Excellent!";
    else if (percentage >= 50) message = "Well Done!";
    else message = "Keep Practicing!";

    return (
        <div className="flex flex-col items-center justify-center py-10">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{message}</h2>
                <p className="text-gray-500 uppercase tracking-wide text-sm mb-6">{mode} Mode Completed</p>

                <div className="flex justify-center mb-8">
                    <div className="w-32 h-32 rounded-full border-8 border-primary flex items-center justify-center text-4xl font-bold text-primary">
                        {Math.round(percentage)}%
                    </div>
                </div>

                <p className="text-lg text-gray-700 mb-8">
                    You scored <strong className="text-primary">{score}</strong> out of <strong>{total}</strong>
                </p>

                <div className="space-y-3">
                    <Link to="/select-mode" className="block w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-secondary transition">
                        Play Again
                    </Link>
                    <Link to="/" className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200 transition">
                        Back Home
                    </Link>
                </div>
            </motion.div>

            {/* Ad Placeholder */}
            <div className="mt-8 w-full max-w-md bg-gray-200 h-24 flex items-center justify-center rounded border-dashed border-gray-400 text-gray-500">
                AdSense Banner
            </div>
        </div>
    );
};

export default ResultPage;
