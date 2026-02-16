import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import QuizSelection from './pages/QuizSelection';
import QuizPage from './pages/QuizPage';
import QuizFeedback from './pages/QuizFeedback';
import ResultPage from './pages/ResultPage';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
// import Terms from './pages/Terms';
// import Contact from './pages/Contact';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/select-mode" element={<QuizSelection />} />
                        <Route path="/quiz/:mode/:questionId" element={<QuizPage />} />
                        <Route path="/quiz/:mode/:questionId/result" element={<QuizFeedback />} />
                        <Route path="/result" element={<ResultPage />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
