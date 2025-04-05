import React, { useState } from 'react';
import './ProblemForm.css';

function ProblemForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    message: '',
    photo: null
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      photo: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('age', formData.age);
    data.append('message', formData.message);
    if (formData.photo) {
      data.append('photo', formData.photo);
    }

    try {
      const response = await fetch('http://localhost/nyaari/submit_problem.php', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit form');
      }

      setSuccess(true);
      setFormData({
        name: '',
        age: '',
        message: '',
        photo: null
      });
    } catch (err) {
      setError(err.message || 'Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="problem-form-container">
      <h1>Submit Your Health Concern</h1>
      {success ? (
        <div className="success-message">
          Thank you for submitting your concern. Our doctors will review it soon.
          <button onClick={() => setSuccess(false)}>Submit Another</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="problem-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
              min="0"
              max="120"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Concern:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="photo">Upload Photo (optional):</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handlePhotoChange}
              accept="image/*"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  );
}

export default ProblemForm; 