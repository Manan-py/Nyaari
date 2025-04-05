import React from 'react';
import './Features.css';

function Features() {
  const features = [
    {
      title: 'Personalized Care',
      description: 'Tailored healthcare solutions designed specifically for women',
      icon: '👩‍⚕️'
    },
    {
      title: 'Health Tracking',
      description: 'Monitor your health metrics and track your progress',
      icon: '📊'
    },
    {
      title: 'Expert Guidance',
      description: 'Access to qualified healthcare professionals',
      icon: '💡'
    },
    {
      title: 'Community Support',
      description: 'Connect with other women on similar health journeys',
      icon: '🤝'
    }
  ];

  return (
    <section className="features-section">
      <h2 className="features-title">Why Choose Nyaari?</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="feature-card"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features; 