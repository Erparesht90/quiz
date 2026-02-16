const Footer = () => {
    return (
        <footer className="bg-gray-100 py-6 mt-auto border-t border-gray-200">
            <div className="container mx-auto px-4 text-center text-gray-600">
                <p>&copy; {new Date().getFullYear()} MathMaster. All rights reserved.</p>
                <div className="mt-2 space-x-4 text-sm">
                    <a href="#" className="hover:text-primary">Privacy Policy</a>
                    <a href="#" className="hover:text-primary">Terms & Service</a>
                    <a href="#" className="hover:text-primary">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
