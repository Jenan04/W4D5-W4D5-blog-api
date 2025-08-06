// routes/posts.js
const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostsByUser } = require('../controllers/postsController');

router.post('/', createPost);
router.get('/', getAllPosts);
router.get('/user/:userId', getPostsByUser);

module.exports = router;
