import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthContext/AuthContext';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await signUp(formData);
    if (success) {
      alert('Registration successful!');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="first_name" placeholder="First Name" onChange={handleChange} />
      <input name="last_name" placeholder="Last Name" onChange={handleChange} />
      <input name="profile_image" placeholder="Profile Image URL" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <input type="password" name="password_confirmation" placeholder="Confirm Password" onChange={handleChange} />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
