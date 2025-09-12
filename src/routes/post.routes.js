const { Router } = require('express');
const router = Router();

// Controllers
const { createPost, getPosts, addComment, getCommentsByPost} = require('../controllers/post.controller');

// Middleware
const { authenticateToken } = require('../middleware/auth');

// Rutas de posts
router.post("/", authenticateToken, createPost);    // Crear un nuevo post (requiere autenticación)
router.get("/", getPosts);                      // Obtener todos los posts
router.post("/", authenticateToken ,addComment);                // Añadir un comentario a un post (requiere autenticación)
router.get("/:postId/comments", getCommentsByPost); // Obtener comentarios de un post específico

module.exports = router;