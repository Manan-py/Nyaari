import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import ServicesPage from './components/ServicesPage';
import ProblemForm from './components/ProblemForm';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showMain, setShowMain] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(true);
      // Show main app slightly after splash screen starts fading
      setTimeout(() => {
        setShowMain(true);
      }, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="App">
        {showSplash && (
          <div className={`splash-screen ${!showSplash ? 'fade-out' : ''}`}>
            <header className="App-header">
              <h1 className="app-title">Nyaari</h1>
              <p className="app-subtitle">Women Healthcare App</p>
            </header>
          </div>
        )}
        <div className={`main-app ${showMain ? 'visible' : ''}`}>
          <Navbar />
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <Features />
              </>
            } />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/submit-problem" element={<ProblemForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
