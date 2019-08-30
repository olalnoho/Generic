const Post = require('../db/Post')
const { validationResult } = require('express-validator')
module.exports = {
   create: async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json(errors)
      }
      const { text } = req.body
      try {
         const post = new Post({
            text,
            user: req.user._id,
            avatar: req.user.avatar,
            name: req.user.name
         })

         await post.save()
         res.json(post)
      } catch (err) {
         console.log(err.message)
         res.status(500).send('Server error')
      }
   },

   read: async (req, res) => {
      try {
         const posts = await Post.find({}).populate('user', ['name', 'avatar']).sort({ date: -1 })
         res.json(posts)
      } catch (err) {
         res.status(500).send('Server error')
      }
   },

   update: async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json(errors)
      }
      try {
         const post = await Post.findById(req.params.id)
         if(post.user.toString() === req.user.id) {
            post.text = req.body.text
            await post.save()
         }
         res.json(post)
      } catch (err) {
         res.status(500).send('Server error')
      }
   },

   // params: id
   findById: async (req, res) => {
      try {
         const post = await Post.findById(req.params.id).populate('user', ['name', 'avatar'])
         res.json(post)
      } catch (err) {
         res.status(500).send('Server error')
      }
   },

   // params: id
   delete: async (req, res) => {
      try {
         const post = await Post.findByIdAndDelete(req.params.id)
         res.json(post)
      } catch (err) {
         res.status(500).send('Server error')
      }
   },

   // params: id
   like: async (req, res) => {
      try {
         const post = await Post.findById(req.params.id)
         await post.like(req.user.id)
         return res.json(post)
      } catch (err) {
         console.log(err.message)
         res.status(500).send('Server error')
      }
   },

   // params: id
   unlike: async (req, res) => {
      try {
         const post = await Post.findById(req.params.id)
         await post.unlike(req.user.id)
         return res.json(post)
      } catch (err) {
         console.log(err.message)
         res.status(500).send('Server error')
      }
   },

   // params: id
   comment: async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json(errors)
      }

      const { avatar, name, id } = req.user

      try {
         const comment = {
            name,
            avatar,
            user: id,
            text: req.body.text
         }
         const post = await Post.findById(req.params.id)
            .then(post => post.comment(comment))

         res.json(post)
      } catch (err) {
         console.log(err.message)
         res.status(500).send('Server error')
      }
   },

   // params: id, postId
   deleteComment: async (req, res) => {
      try {
         const post = await Post.findById(req.params.id)
            .then(post =>
               post.deleteComment(req.params.post_id, req.user.id)
            )

         res.json(post)
      } catch (err) {
         console.log(err.message)
         res.status(500).send('Server error')
      }
   }
}