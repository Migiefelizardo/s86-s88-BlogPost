import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import API from '../api';

export default function BlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchBlog();
    fetchComments();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const res = await API.get(`/blogs/${id}`);
      setBlog(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/blog/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await API.delete(`/blogs/${id}`);
        alert('Blog deleted.');
        navigate('/');
      } catch (err) {
        console.error(err);
        alert('Failed to delete.');
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/comments', { blogId: id, content: newComment });
      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error(err);
      alert('Failed to add comment.');
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (window.confirm('Delete this comment?')) {
      try {
        await API.delete(`/comments/${commentId}`);
        fetchComments();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (!blog) return <div>Loading...</div>;

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
      <h2>{blog.title}</h2>
      <p style={{ color: '#666' }}>By: {blog.author.username}</p>
      <div style={{ margin: '20px 0' }}>{blog.content}</div>

      {token && (user._id === blog.author._id || user.isAdmin) && (
        <div style={{ marginBottom: '20px' }}>
          <Link to={`/edit/${blog._id}`}><button style={{ marginRight: '10px' }}>Edit</button></Link>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}

      <hr />
      <h3>Comments</h3>

      {comments.length === 0 && <p>No comments yet. Be the first to comment!</p>}

      {comments.map(comment => (
        <div key={comment._id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
          <p><b>{comment.author.username}:</b> {comment.content}</p>
          {token && (user._id === comment.author._id || user.isAdmin) && (
            <button onClick={() => handleCommentDelete(comment._id)}>Delete</button>
          )}
        </div>
      ))}

      {token ? (
        <form onSubmit={handleCommentSubmit} style={{ marginTop: '20px' }}>
          <textarea 
            value={newComment} 
            onChange={(e) => setNewComment(e.target.value)} 
            required 
            placeholder="Write a comment..." 
            rows="3" 
            style={{ width: '100%', padding: '10px' }}
          ></textarea>
          <button type="submit" style={{ marginTop: '10px' }}>Add Comment</button>
        </form>
      ) : (
        <p>Login to comment.</p>
      )}
    </div>
  );
}
