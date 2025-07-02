import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import ProviderDetail from './pages/ProviderDetail';
import BecomeProvider from './pages/BecomeProvider';
import About from './pages/About';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <AnimatePresence mode="wait">
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/provider/:id" element={<ProviderDetail />} />
              <Route path="/become-provider" element={<BecomeProvider />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </motion.main>
        </AnimatePresence>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;