import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';

export default function HomePage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await API.get('/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch blogs');
    }
  };

  return (
    <div>
      <h2>All Blogs</h2>
      {blogs.map(blog => (
        <div key={blog._id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '8px' }}>
          <h3>{blog.title}</h3>
          <p style={{ color: '#555' }}>By: {blog.author.username}</p>
          <p>{blog.content.substring(0, 150)}...</p>
          <Link to={`/blogs/${blog._id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
}
