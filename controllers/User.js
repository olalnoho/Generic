const { validationResult } = require('express-validator')
const gravatar = require('gravatar')
const User = require('../db/User')


module.exports = {
   getUsers: async (req, res) => {
      try {
         const users = await User.find({}).select('name')
         res.json(users)
      } catch (err) {
         res.status(500).json(err.message)
      }
   },

   registerUser: async (req, res) => {

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
   }
}