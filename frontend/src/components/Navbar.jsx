import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-primary">MathMaster</Link>
                <div className="space-x-4">
                    <Link to="/" className="text-gray-600 hover:text-primary transition">Home</Link>
                    <Link to="/select-mode" className="text-gray-600 hover:text-primary transition">Play Quiz</Link>
                    <Link to="/admin/login" className="text-gray-600 hover:text-primary transition">Admin</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
