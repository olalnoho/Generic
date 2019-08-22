const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()

const Controller = require('../controllers/Auth')

router.post('/', Controller.login)
router.get('/', auth, Controller.fetchUser)


module.exports = router