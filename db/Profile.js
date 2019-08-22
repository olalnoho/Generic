const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const profileSchema = new mongoose.Schema({
   user: {
      type: ObjectId,
      ref: 'user'
   },

   bio: String,
   location: String,

   hobbies: {
      type: [String],
   },
   posts: [{
      user: {
         type: ObjectId,
         ref: 'user'
      },

      text: {
         type: String,
         required: true
      },

      name: String,
      avatar: String,

      comments: [{
         text: {
            type: String,
            required: true,
         },
         user: {
            type: ObjectId,
            ref: 'user'
         },
         name: String,
         avatar: String,
      }],

      likes: [{
         user: {
            type: ObjectId,
            ref: 'user'
         },
      }]

   }],
   date: {
      type: Date,
      default: Date.now()
   }
})

const Profile = mongoose.model('profile', profileSchema)
module.exports = Profile