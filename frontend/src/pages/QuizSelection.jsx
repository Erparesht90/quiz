import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const modes = [
    { name: 'Easy', path: 'easy', color: 'bg-green-500', desc: 'Numbers 1-20, (+, -)' },
    { name: 'Hard', path: 'hard', color: 'bg-yellow-500', desc: 'Numbers 10-100, (*, /)' },
    { name: 'Master', path: 'master', color: 'bg-red-500', desc: 'Numbers 10-1000, Mixed Logic' },
];

const QuizSelection = () => {
    return (
        <div className="flex flex-col items-center py-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Select Difficulty</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {modes.map((mode, index) => (
                    <motion.div
                        key={mode.path}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-gray-100 w-64 text-center group"
                    >
                        <div className={`w-16 h-16 mx-auto ${mode.color} rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4`}>
                            {mode.name[0]}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{mode.name} Mode</h3>
                        <p className="text-gray-500 text-sm mb-6">{mode.desc}</p>
                        <Link to={`/quiz/${mode.path}`} className="block w-full bg-primary text-white py-2 rounded-lg font-medium group-hover:bg-secondary transition-colors">
                            Play Now
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default QuizSelection;
