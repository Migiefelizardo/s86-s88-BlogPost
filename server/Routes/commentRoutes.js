const express = require('express');
const router = express.Router();
const { protect, admin } = require('../Middleware/auth');
const { addComment, getCommentsByBlog, deleteComment } = require('../Controllers/commentController');

router.post('/', protect, addComment);
router.get('/:blogId', getCommentsByBlog);
router.delete('/:id', protect, deleteComment);

module.exports = router;
