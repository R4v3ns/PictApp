const { Router } = require('express');
const router = Router();

// Controllers
const { register, viewProfile, login } = require("../controllers/user.controller");

// Rutas de usuarios
router.post("/register", register);              // Crear usuario
router.post("/login", login);                    // Iniciar sesión
router.get("/profile/:id", viewProfile);        // Ver perfil de usuario (GET es más común para obtener datos)

module.exports = router;

