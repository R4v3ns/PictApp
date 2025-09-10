const { Router } = require('express');
const router = Router();

// Controllers
const { register, viewProfile } = require("../controllers/user.controller");
const { createLike, getLikes } = require('../controllers/like.controller'); // importar ambas funciones

// Rutas de usuario
router.post("/register", register);              // Crear usuario
router.get("/profile/:id", viewProfile);        // Ver perfil de usuario (GET es más común para obtener datos)

// Rutas de likes
router.post("/like", createLike);               // Crear un nuevo like
router.get("/likes", getLikes);                // Obtener todos los likes

module.exports = router;
