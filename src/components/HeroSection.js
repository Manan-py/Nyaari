import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/services');
  };

  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Empowering Women's Health</h1>
        <p className="hero-subtitle">Your journey to better health starts here</p>
        <div className="hero-buttons">
          <button className="primary-button" onClick={handleGetStarted}>Get Started</button>
          <button className="secondary-button">Learn More</button>
        </div>
      </div>
      <div className="hero-image-container">
        <div className="floating-image">
          <img src="/images/hero-image.png" alt="Women's Health" className="hero-image" />
        </div>
      </div>
    </div>
  );
}

export default HeroSection; 