const { Router } = require('express');
const router = Router();

// Controllers
const { createPost, getPosts } = require('../controllers/post.controller');

// Middleware
const { authenticateToken } = require('../middleware/auth');

// Rutas de posts
router.post("/", authenticateToken, createPost);    // Crear un nuevo post (requiere autenticación)
router.get("/", getPosts);       // Obtener todos los posts

module.exports = router;