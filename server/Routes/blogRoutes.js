const express = require('express');
const router = express.Router();
const { protect, admin } = require('../Middleware/auth');
const {
  createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog
} = require('../Controllers/blogController');

router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post('/', protect, createBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);

module.exports = router;
