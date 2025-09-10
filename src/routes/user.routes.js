const { Router } = require('express');
const router = Router();

// Controllers
const { register, viewProfile } = require("../controllers/user.controller");
const { createLike, getLikes } = require('../controllers/like.controller'); // importar ambas funciones
const { createComment, getComments } = require('../controllers/comment.controller');
// Rutas de usuario
router.post("/register", register);              // Crear usuario
router.get("/profile/:id", viewProfile);        // Ver perfil de usuario (GET es más común para obtener datos)

// Rutas de likes
router.post("/like", createLike);               // Crear un nuevo like
router.get("/likes", getLikes);                // Obtener todos los likes

// Rutas de comentarios
router.post("/comment", createComment);         // Crear un nuevo comentario
router.get("/comments", getComments);          // Obtener todos los comentarios (descomentar si se necesita)     
module.exports = router;
