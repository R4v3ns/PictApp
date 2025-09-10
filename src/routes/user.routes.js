const { Router } = require('express')

const router = Router()

// Controllers
const { register, viewProfile } = require("../controllers/user.controller")
const { like } = require('../controllers/like.controllers')

// Register Route
router.post("/register", register)
router.post("/profile/:id", viewProfile)
router.post("/like", like)

module.exports = router