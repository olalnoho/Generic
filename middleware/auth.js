const jwt = require('jsonwebtoken')
const User = require('../db/User')

module.exports = async function auth(req, res, next) {
   try {
      const token = req.header('x-auth-token')
      const decoded = jwt.verify(token, 'secret')
      const user = await User.findById(decoded.id).select('-password')
      if (!user) throw Error()
      req.token = token
      req.user = user
      next()
   } catch (err) {
      console.log(err.message)
      res.status(401).send('Not Authorized')
   }
}