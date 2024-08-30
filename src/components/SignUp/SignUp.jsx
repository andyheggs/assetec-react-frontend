import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext/AuthContext';
import ImageUpload from '../ImageUpload/ImageUpload';
import './SignUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    profile_image: '',
    password: '',
    password_confirmation: '',
  });

  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.profile_image) {
      setMessage('Please upload a profile image');
      return;
    }

    const success = await signUp(formData);
    if (success) {
      alert('Registration successful!');
      navigate('/sign-in');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (url) => {
    setFormData({
      ...formData,
      profile_image: url,
    });
  };

  const handleSignIn = () => {
    navigate('/sign-in');
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
          <div className="nav-button signin-button" onClick={handleSignIn}>
            Sign-in
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="main-heading">
            take your future into your own hands...
        </div>
        <form onSubmit={handleSubmit} className="signup-form">
          <input name="username" placeholder="Username" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="first_name" placeholder="First Name" onChange={handleChange} />
          <input name="last_name" placeholder="Last Name" onChange={handleChange} />
          <ImageUpload
            name="profile_image"
            label="Upload Profile Image"
            profileImage={formData.profile_image}
            handleImageUpload={handleImageUpload}
            setMessage={setMessage}
          />
          {message && <p className="error-message">{message}</p>}
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
