const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
   },
   name: String,
   avatar: String,
   text: {
      type: String,
      required: true,
   },
   likes: [{
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
      }
   }],

   comments: [{
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user'
      },
      text: {
         type: String,
         required: true
      },
      name: {
         type: String,
      },
      avatar: {
         type: String,
      },
      date: {
         type: Date,
         default: Date.now()
      }
   }],
   date: {
      type: Date,
      default: Date.now()
   }
})

postSchema.methods.like = async function (id) {
   if (!this.likes.find(({ user }) => user == id)) {
      this.likes.push({ user: id })
      await this.save()
   }
}

postSchema.methods.unlike = async function (id) {
   this.likes = this.likes.filter(({ user }) => user.toString() !== id)
   await this.save()
}

postSchema.methods.comment = async function (comment) {
   this.comments.unshift(comment)
   await this.save()
   return this
}

postSchema.methods.deleteComment = async function (postId, userId) {
   const comment = this.comments.find(comment =>
      comment._id.toString() == postId
   )

   if (comment && comment.user == userId) {
      await comment.remove()
      await this.save()
   }
   return this
}

const Post = mongoose.model('post', postSchema)
module.exports = Post