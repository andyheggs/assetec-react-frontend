import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';
import './SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.username, formData.password);
    navigate('/index');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  return (
    <div className="landing-container">
      <div className="header">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dim47nr4g/image/upload/v1724788755/Project_4-Logo-i_g0noth.png"
            alt="Assetec Logo"
            className="logo"
          />
          <div className="logo-name">assetec</div>
        </div>
        <div className="nav-links">
          <div className="nav-button signup-button" onClick={handleSignUp}>
            Sign-up
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="main-heading">
            take your future into your own hands...
        </div>
        <form onSubmit={handleSubmit} className="signin-form">
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="signin-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="signin-input"
          />
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

