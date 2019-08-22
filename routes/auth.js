const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

const Controller = require('../controllers/Auth')
// Login
router.post('/', Controller.login)

// Get logged in user
router.get('/', auth, Controller.fetchUser)


module.exports = router