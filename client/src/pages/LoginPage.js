import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Login failed.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
