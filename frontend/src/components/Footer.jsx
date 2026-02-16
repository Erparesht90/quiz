import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-yellow-100 py-6 text-center border-t-4 border-yellow-200">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center text-yellow-800 font-bold gap-4">
                <p>&copy; {new Date().getFullYear()} MathFun for Kids! 🎈</p>
                <div className="space-x-4 text-sm">
                    <Link to="/privacy-policy" className="hover:text-purple-600 transition">Privacy Policy</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
