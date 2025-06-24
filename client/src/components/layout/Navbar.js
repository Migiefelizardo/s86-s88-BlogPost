import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '15px', backgroundColor: '#333', color: '#fff' }}>
      <Link to="/" style={{ color: '#fff', marginRight: '15px' }}>Home</Link>
      {user ? (
        <>
          <Link to="/create" style={{ color: '#fff', marginRight: '15px' }}>Create Blog</Link>
          <span>Welcome, {user.username} </span>
          <button onClick={handleLogout} style={{ marginLeft: '15px' }}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color: '#fff', marginRight: '15px' }}>Login</Link>
          <Link to="/register" style={{ color: '#fff' }}>Register</Link>
        </>
      )}
    </nav>
  );
}
