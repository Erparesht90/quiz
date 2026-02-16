import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdComponent from '../components/AdComponent';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4 bg-yellow-50 overflow-hidden relative">
            
            {/* Animated Header */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="mt-10 mb-8 z-10"
            >
                <div className="text-9xl mb-4 animate-bounce drop-shadow-lg">🐻</div>
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-xl tracking-wide selection:bg-pink-200" style={{ fontFamily: '"Comic Sans MS", "Chalkboard SE", sans-serif' }}>
                    Math Fun!
                </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-2xl md:text-3xl text-gray-700 mb-12 font-bold max-w-lg leading-relaxed z-10"
            >
                Learn numbers & have fun! 🌟<br/>
                Are you ready to play?
            </motion.p>

            {/* Play Button */}
            <motion.div
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.9 }}
                className="z-10 w-full max-w-xs"
            >
                <Link to="/select-mode" className="block w-full bg-gradient-to-b from-green-400 to-green-600 text-white border-b-8 border-green-700 active:border-b-0 active:translate-y-2 px-8 py-6 rounded-3xl text-4xl font-black shadow-2xl hover:shadow-orange-200 transition-all flex items-center justify-center gap-4">
                    <span>▶️</span> PLAY
                </Link>
            </motion.div>

            {/* Ad Placement */}
            <div className="mt-12 w-full max-w-md z-10">
                <AdComponent className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border-4 border-yellow-200" />
            </div>
            
            {/* Floating Background Shapes */}
            <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="fixed top-20 -left-10 text-8xl opacity-20 select-none">🎈</motion.div>
            <motion.div animate={{ y: [0, 20, 0], rotate: [0, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="fixed bottom-32 -right-5 text-8xl opacity-20 select-none">🍦</motion.div>
            <motion.div animate={{ x: [0, 30, 0] }} transition={{ repeat: Infinity, duration: 8 }} className="fixed top-40 right-10 text-8xl opacity-20 select-none">⭐</motion.div>
            <motion.div animate={{ x: [0, -30, 0] }} transition={{ repeat: Infinity, duration: 7 }} className="fixed bottom-10 left-20 text-8xl opacity-20 select-none">🎨</motion.div>
            
            {/* Floor Decoration */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-green-200 to-transparent -z-0"></div>
        </div>
    );
};

export default Home;

