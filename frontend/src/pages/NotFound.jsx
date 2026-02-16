import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="text-center py-20">
            <h1 className="text-6xl font-bold text-gray-300">404</h1>
            <p className="text-xl text-gray-600 mt-4">Page not found</p>
            <Link to="/" className="text-primary mt-6 inline-block hover:underline">Go Home</Link>
        </div>
    );
};

export default NotFound;
