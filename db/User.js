const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true,
   },
   avatar: {
      type: String,
   },
   date: {
      type: Date,
      default: Date.now()
   }
})

userSchema.pre('save', async function (next) {
   if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
   }
   next()
})

userSchema.statics.login = async function (email, password) {
   const user = await this.findOne({ email })
   if (!user) {
      throw Error('Invalid credentials')
   }
   const isMatch = await bcrypt.compare(password, user.password)
   if (!isMatch) {
      throw Error('Invalid credentials')
   }

   return user
}

userSchema.methods.getAuthToken = async function () {
   const token = await jwt.sign({ id: this._id }, process.env.jwt_secret, { expiresIn: 360000 })
   return token
}

const User = mongoose.model('user', userSchema)
module.exports = User