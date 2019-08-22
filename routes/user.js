const express = require('express')
const { check } = require('express-validator')
const router = express.Router()
const Controller = require('../controllers/User')

/*
   --- User Schema ---

   Name:       String
   Email       String
   Password:   String
   Avatar:     String

*/

// Register a user
router.post('/', [
   check('name', 'Name is required').not().isEmpty(),
   check('password', 'Passowrd is required').isLength({ min: 6 }),
   check('email', 'Email must be valid').isEmail(),
], Controller.registerUser)

router.get('/', Controller.getUsers)

module.exports = router