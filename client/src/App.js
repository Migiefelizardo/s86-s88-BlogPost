import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import BlogFormPage from './pages/BlogFormPage';
import BlogPage from './pages/BlogPage';

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '20px auto', padding: '20px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<BlogFormPage />} />
          <Route path="/edit/:id" element={<BlogFormPage />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
