const User = require('../db/User')

module.exports = {
   login: async (req, res) => {
      try {
         const { email, password } = req.body
         const test = await User.login(email, password)
         const token = await test.getAuthToken()
         res.json(token)
      } catch (err) {
         console.log('From login user')
         res.status(400).json(err.message)
      }
   },

   fetchUser: async (req, res) => {
      try {
         res.json(req.user)
      } catch (err) {
         console.log('From "get auth user"', err.message)
         res.json(err.message)
      }
   }
}