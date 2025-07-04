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
    <div className="page-container landing-container">
      <div className="header">
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/dim47nr4g/image/upload/v1724788755/Project_4-Logo-i_g0noth.png"
            alt="Assetec Logo"
            className="logo logo--small"
          />
          <div className="logo-name logo-name--small">assetec</div>
        </div>
        <div className="nav-links">
          <div className="btn btn--nav btn--signup nav-button signup-button" onClick={handleSignUp}>
            Sign-up
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="heading-main heading-main--standard main-heading">
            take your future into your own hands...
        </div>
        <form onSubmit={handleSubmit} className="container container--centered container--bordered signin-form">
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="form-input signin-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="form-input signin-input"
          />
          <button type="submit" className="btn btn--primary btn--large signin-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

