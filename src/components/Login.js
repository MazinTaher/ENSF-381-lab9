import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch("http://127.0.0.1:5000/validate_login", {
            method: "POST",
            headers: {"Content-Type": "application/json", },
            body: JSON.stringify({ username, password }),
          });
          
      const data = await response.json();
      
      if (data.success) {
        navigate('/predict');
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      setError('Error connecting to server. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;