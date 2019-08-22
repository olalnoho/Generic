const express = require('express')
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const User = require('../db/User')
const router = express.Router()

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

], async (req, res) => {

   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors })
   }

   const { email, name, password } = req.body

   try {

      let user = await User.findOne({ email })
      if (user) return res.status(400).json({ errors: [{ msg: 'User already exists' }] })

      const avatar = gravatar.url(email, {
         s: '200',
         r: 'pg',
         default: 'mm',
      })

      user = new User({ name, email, password, avatar })
      // Mongoose pre-hook hashes password, no need to do it here.
      await user.save()
      const token = await user.getAuthToken()
      res.json(token)

   } catch (error) {
      res.status(500).json(err.message)
   }
})

module.exports = router