import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Registration failed.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
