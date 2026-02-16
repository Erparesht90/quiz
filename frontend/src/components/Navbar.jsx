import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm border-b-4 border-yellow-200">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-3xl font-black tracking-tight hover:scale-105 transition transform flex items-center gap-2">
                    <span className="text-4xl">🧮</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500" style={{ fontFamily: '"Comic Sans MS", cursive' }}>
                        MathFun
                    </span>
                </Link>
                <div className="flex gap-4">
                    <Link to="/" className="px-5 py-2 rounded-2xl font-black text-gray-500 hover:bg-yellow-100 hover:text-yellow-600 transition">
                        HOME
                    </Link>
                </div>
            </div>
        </nav>
    );
};


export default Navbar;
