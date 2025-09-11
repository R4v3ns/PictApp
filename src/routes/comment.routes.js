const { Router } = require('express');
const router = Router();

// Controllers
const { createComment, getComments } = require('../controllers/comment.controller');

// Rutas de comentarios
router.post("/", createComment);    // Crear un nuevo comentario
router.get("/", getComments);       // Obtener todos los comentarios

module.exports = router;
