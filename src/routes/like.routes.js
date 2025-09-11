const { Router } = require('express');
const router = Router();

// Controllers
const { createLike, getLikes } = require('../controllers/like.controller');

// Rutas de likes
router.post("/", createLike);       // Crear un nuevo like
router.get("/", getLikes);          // Obtener todos los likes

module.exports = router;