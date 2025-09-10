const { Router } = require('express')

const router = Router()

// Controllers
const { register } = require("../controllers/user.controller")

// Register Route
router.post("/register", register)
router.post("/profile/:id", viewProfile)

module.exports = router