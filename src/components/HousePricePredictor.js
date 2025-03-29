import React, { useState } from 'react';
import './HousePricePredictor.css';

function HousePricePredictor() {
  const [formData, setFormData] = useState({
    city: '',
    province: '',
    latitude: '',
    longitude: '',
    lease_term: '',
    type: '',
    beds: '',
    baths: '',
    sq_feet: '',
    furnishing: 'Unfurnished',
    smoking: 'No',
    pets: false
  });
  
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://127.0.0.1:5000/predict_house_price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.predicted_price) {
        setPrediction(data.predicted_price);
        setError('');
      } else {
        setError('Error getting prediction. Please try again.');
        setPrediction(null);
      }
    } catch (error) {
      setError('Error connecting to server. Please try again.');
      setPrediction(null);
    }
  };

  return (
    <div className="predictor-container">
      <h2>House Rental Price Predictor</h2>
      
      <form onSubmit={handleSubmit} className="predictor-form">
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="province">Province</label>
          <input type="text" id="province" name="province" value={formData.province} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="latitude">Latitude</label>
          <input type="number" step="any" id="latitude" name="latitude" value={formData.latitude} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="longitude">Longitude</label>
          <input type="number" step="any" id="longitude" name="longitude" value={formData.longitude} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="lease_term">Lease Term</label>
          <input type="text" id="lease_term" name="lease_term" value={formData.lease_term} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="type">Type of House</label>
          <input type="text" id="type" name="type" value={formData.type} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="beds">Number of Beds</label>
          <input type="number" id="beds" name="beds" value={formData.beds} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="baths">Number of Baths</label>
          <input type="number" step="0.5" id="baths" name="baths" value={formData.baths} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="sq_feet">Square Feet</label>
          <input type="number" id="sq_feet" name="sq_feet" value={formData.sq_feet} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="furnishing">Furnishing</label>
          <select id="furnishing" name="furnishing" value={formData.furnishing} onChange={handleChange} required
          >
            <option value="Unfurnished">Unfurnished</option>
            <option value="Partially Furnished">Partially Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="smoking">Smoking</label>
          <select id="smoking" name="smoking" value={formData.smoking} onChange={handleChange} required
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>
        
        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" name="pets" checked={formData.pets} onChange={handleChange}/>Pets?
          </label>
        </div>
        
        <button type="submit" className="predict-button">Predict Rental Price</button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      {prediction && (
        <div className="prediction-result">
          <h3>Predicted Monthly Rent</h3>
          <p>${prediction.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}

export default HousePricePredictor;