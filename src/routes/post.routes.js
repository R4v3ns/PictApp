const { Router } = require('express');
const router = Router();

const { createPost, getPosts, addComment, getCommentsByPost } = require('../controllers/post.controller');
const { authenticateToken } = require('../middleware/auth');

router.post("/", authenticateToken, createPost);
router.get("/", getPosts);
router.post("/:postId/comments", authenticateToken, addComment);
router.get("/:postId/comments", getCommentsByPost);

module.exports = router;