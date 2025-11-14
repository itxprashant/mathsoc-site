import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles/main.css';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Loader from './components/layout/Loader';

// Page components
import Home from './components/pages/Home';
import About from './components/pages/About';
import Events from './components/pages/Events';
import Team from './components/pages/Team';
import Contact from './components/pages/Contact';

// Theme context
import { ThemeProvider } from './utils/ThemeContext';

function AppContent() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Simulate loading for navigation
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    // Scroll to top on route change
    window.scrollTo(0, 0);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    // Handle online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update page title based on route
  useEffect(() => {
    const path = location.pathname.replace('/', '') || 'home';
    const pageName = path.charAt(0).toUpperCase() + path.slice(1);
    document.title = `${pageName} | MathSoc IITD`;
  }, [location.pathname]);

  return (
    <>
      <Loader isLoading={loading} />
      
      {!isOnline && (
        <div className="alert-offline alert alert-danger alert-dismissible fade show" role="alert">
          <div style={{fontSize:'1.075em'}}><strong>You are Offline!</strong></div>
          <div style={{lineHeight:'1.3'}}>No network available. Check your internet connection and try again!</div> 
          <button type="button" className="close" onClick={() => setIsOnline(true)} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}

      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
