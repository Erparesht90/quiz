import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-extrabold text-secondary mb-6"
            >
                Master Your Math Skills!
            </motion.h1>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 mb-8 max-w-2xl"
            >
                Challenge yourself with our Easy, Hard, and Master level math quizzes.
                Improve your speed and accuracy today!
            </motion.p>
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <Link to="/select-mode" className="bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-secondary transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Start Quiz Now
                </Link>
            </motion.div>

            {/* AdSense Placeholder */}
            <div className="mt-12 w-full max-w-2xl bg-gray-200 h-32 flex items-center justify-center rounded-md border-2 border-dashed border-gray-300">
                <span className="text-gray-500">AdSense Banner Here</span>
            </div>
        </div>
    );
};

export default Home;
