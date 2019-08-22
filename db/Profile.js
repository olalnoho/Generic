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

profileSchema.methods.like = function (postId, userId) {
   this.posts.forEach(post => {
      if (post._id.toString() === postId) {
         if (!post.likes.find(like => like.user.toString() == userId.toString())) {
            post.likes.push({ user: userId })
         }
      }
   })
}

profileSchema.methods.unlike = function (postId, userId) {
   this.posts.forEach(post => {
      if (post._id.toString() === postId) {
         post.likes = post.likes.filter(like =>
            like.user.toString() !== userId.toString()
         )
      }
   })
}

profileSchema.methods.comment = function (req) {
   const post = this.posts.find(post =>
      post._id.toString() === req.params.post_id
   )

   post.comments.unshift({
      text: req.body.text,
      user: req.user._id,
      name: req.user.name,
      avatar: req.user.avatar
   })

   return post
}

profileSchema.methods.removeComment = async function(req){
   
   const post = this.posts.find(post =>
      post._id.toString() === req.params.post_id
   )

   const comment = post.comments.find(comment =>
      comment._id.toString() == req.params.comment_id
   )

   if (req.user._id == comment.user.toString()) {
      await comment.remove()
   }
   await this.save()
   return post
}
const Profile = mongoose.model('profile', profileSchema)
module.exports = Profile