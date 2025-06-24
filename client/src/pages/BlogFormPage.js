import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api';

export default function BlogFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    if (isEdit) {
      API.get(`/blogs/${id}`).then(res => {
        setFormData({ title: res.data.title, content: res.data.content });
      }).catch(err => console.error(err));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await API.put(`/blogs/${id}`, formData);
        alert('Blog updated!');
      } else {
        await API.post('/blogs', formData);
        alert('Blog created!');
      }
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Failed to submit blog');
    }
  };

  return (
    <div>
      <h2>{isEdit ? 'Edit Blog' : 'Create Blog'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="title" 
          placeholder="Title" 
          value={formData.title} 
          onChange={handleChange} 
          required 
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <textarea 
          name="content" 
          placeholder="Content" 
          value={formData.content} 
          onChange={handleChange} 
          required 
          rows="10"
          style={{ width: '100%', padding: '10px' }}
        />
        <button type="submit" style={{ marginTop: '10px' }}>
          {isEdit ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
}
