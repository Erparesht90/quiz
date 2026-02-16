import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-5xl font-extrabold text-secondary mb-6">
                Master Your Math Skills!
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Challenge yourself with our Easy, Hard, and Master level math quizzes.
                Improve your speed and accuracy today!
            </p>
            <div>
                <Link to="/select-mode" className="bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-secondary transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Start Quiz Now
                </Link>
            </div>

            {/* AdSense Placeholder */}
            <div className="mt-12 w-full max-w-2xl bg-gray-200 h-32 flex items-center justify-center rounded-md border-2 border-dashed border-gray-300">
                <span className="text-gray-500">AdSense Banner Here</span>
            </div>
        </div>
    );
};

export default Home;
