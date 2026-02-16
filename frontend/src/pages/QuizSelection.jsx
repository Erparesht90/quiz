import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdComponent from '../components/AdComponent';

const modes = [
    { 
        name: 'Easy Peasy', 
        path: 'easy', 
        bg: 'bg-green-100', 
        border: 'border-green-400', 
        text: 'text-green-700', 
        emoji: '🌱', 
        desc: 'Numbers 1-10 \n Simple Addition (+)', 
        delay: 0.1 
    },
    { 
        name: 'Super Solver', 
        path: 'hard', 
        bg: 'bg-yellow-100', 
        border: 'border-yellow-400', 
        text: 'text-yellow-700', 
        emoji: '🚀', 
        desc: 'Numbers 1-20 \n Mix of (+, -)', 
        delay: 0.2 
    },
    { 
        name: 'Math Master', 
        path: 'master', 
        bg: 'bg-red-100', 
        border: 'border-red-400', 
        text: 'text-red-700', 
        emoji: '👑', 
        desc: 'Times Tables (×) \n Challenge Yourself!', 
        delay: 0.3 
    },
];

const QuizSelection = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-[85vh] flex flex-col items-center py-8 px-4 relative overflow-hidden bg-white">
            
            {/* Header */}
            <motion.div 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-10 z-10"
            >
                <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-sm mb-2" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
                    Pick a Level!
                </h2>
                <p className="text-xl text-gray-500 font-bold">How smart are you today? 🧠</p>
            </motion.div>

            {/* Cards Container */}
            <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl z-10">
                {modes.map((mode) => (
                    <motion.div
                        key={mode.path}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: mode.delay }}
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        className={`relative p-6 rounded-3xl shadow-xl border-b-8 ${mode.bg} ${mode.border} flex flex-col items-center text-center`}
                    >
                        <div className="text-6xl mb-4 filter drop-shadow-md">{mode.emoji}</div>
                        <h3 className={`text-3xl font-black ${mode.text} mb-2`}>{mode.name}</h3>
                        <p className="text-gray-600 font-bold whitespace-pre-line mb-6 flex-grow">{mode.desc}</p>
                        
                        <button 
                            onClick={() => {
                                sessionStorage.removeItem(`quiz_${mode.path}`);
                                sessionStorage.removeItem(`quiz_score_${mode.path}`);
                                navigate(`/quiz/${mode.path}/1`);
                            }}
                            className={`w-full py-3 rounded-2xl font-black text-white text-xl shadow-lg border-b-4 active:border-b-0 active:translate-y-1 transition-all uppercase tracking-wide ${mode.text.replace('text', 'bg').replace('700', '500')} border-white/20`}
                        >
                            Start Game ▶
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 w-full max-w-2xl z-10">
                <AdComponent className="bg-white/60 backdrop-blur rounded-2xl border-2 border-dashed border-gray-300" />
            </div>

            {/* Floating Elements */}
            <div className="fixed top-1/4 left-5 text-9xl opacity-10 rotate-12 -z-0 select-none">🦄</div>
            <div className="fixed bottom-1/4 right-5 text-9xl opacity-10 -rotate-12 -z-0 select-none">🦕</div>
            <div className="fixed top-10 right-10 text-8xl opacity-10 rotate-45 -z-0 select-none">⭐</div>
        </div>
    );
};

export default QuizSelection;
