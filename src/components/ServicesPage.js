import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesPage.css';

function ServicesPage() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log('File selected:', file.name, file.type, file.size);

    // Reset states
    setPrediction(null);
    setError(null);
    setLoading(true);

    // Create preview URL
    setSelectedImage(URL.createObjectURL(file));

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      setLoading(false);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Sending request to backend...');
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      });

      console.log('Response received:', response.status);
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.error) {
        throw new Error(data.error);
      }

      setPrediction(data.result);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Failed to connect to the server. Please make sure the Python backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="services-page">
      <h1 className="services-title">Our Services</h1>
      <div className="services-grid">
        <div className="service-card">
          <div className="service-icon">🔍</div>
          <h2>Check PCOS Status</h2>
          <p>Upload an ultrasound image to check for PCOS</p>
          <div className="image-upload-container">
            {selectedImage ? (
              <div className="image-preview">
                <img src={selectedImage} alt="Uploaded" />
                {loading ? (
                  <div className="loading">
                    <div className="loading-spinner"></div>
                    Processing image...
                  </div>
                ) : error ? (
                  <div className="error-message">
                    {error}
                    <button className="retry-button" onClick={() => setSelectedImage(null)}>
                      Try Again
                    </button>
                  </div>
                ) : prediction ? (
                  <div className={`prediction-result ${prediction === 'PCOS' ? 'positive' : 'negative'}`}>
                    {prediction === 'PCOS' ? 'PCOS Detected' : 'No PCOS Detected'}
                  </div>
                ) : null}
              </div>
            ) : (
              <label className="upload-button">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
            )}
          </div>
        </div>

        <div className="service-card">
          <div className="service-icon">💬</div>
          <h2>Share Your Problem</h2>
          <p>Submit your health concerns to our private doctors</p>
          <button className="submit-button" onClick={() => navigate('/submit-problem')}>
            Submit Problem
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage; 