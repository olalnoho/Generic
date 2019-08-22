const { validationResult } = require('express-validator')
const Profile = require('../db/Profile')

module.exports = {
   createProfile: async (req, res) => {

      const {
         bio,
         location,
         hobbies,
      } = req.body

      try {
         let profile = await Profile.findOne({ user: req.user._id })
         let formattedHobbies = hobbies ?
            hobbies
               .split(',')
               .map(hobby => hobby.trim())
            : profile.hobbies || []

         // profile.hobbies ? profile.hobbies : []

         if (profile) {
            profile.bio = bio
            profile.location = location
            profile.hobbies = formattedHobbies
            await profile.save()
            return res.json(
               await profile
                  .populate('user', ['name', 'avatar'])
                  .execPopulate()
            )
         }

         profile = new Profile({
            user: req.user._id,
            bio,
            location,
            hobbies: formattedHobbies,
         })

         await profile.save()

         return res.json(
            await profile
               .populate('user', ['name', 'avatar'])
               .execPopulate()
         )
      } catch (err) {
         console.log(err)
         res.status(500).send('Server error')
      }
   },

   getProfile: async (req, res) => {
      try {
         const profile = await Profile.findOne({ user: req.user._id })
         if (!profile) {
            return res.status(400).json({ msg: 'No profile for this user' })
         }
         res.json(await profile.populate('user', ['name', 'avatar']).execPopulate())
      } catch (err) {
         res.status(500).send('Server error')
      }
   },

   getUserProfile: async (req, res) => {
      try {
         const profile = await Profile.findOne({ user: req.params.user_id })
         if (!profile) {
            return res.status(400).json({ msg: 'No profile for this user' })
         }
         res.json(await profile.populate('user', ['name', 'avatar']).execPopulate())
      } catch (err) {
         console.log(err)
         res.status(500).send('Server error')
      }
   },

   postOnProfile: async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors })
      }
      const { text } = req.body
      const { name, avatar, _id } = req.user
      try {
         const profile = await Profile.findById(req.params.id)
         profile.posts.unshift({ text, name, avatar, user: _id })
         await profile.save()
         res.json(profile.posts)
      } catch (err) {
         console.log(err.message)
         res.status(500).send('Server error')
      }
   },

   removePost: async (req, res) => {
      try {
         const profile = await Profile.findById(req.params.profile_id)
         profile.posts = profile.posts.filter(post => post._id.toString() !== req.params.post_id)
         await profile.save()
         res.json(profile.posts)
      } catch (err) {
         console.log(err.message)
         res.status(500).send('Server error')
      }
   },

   likePost: async (req, res) => {
      try {
         const profile = await Profile.findById(req.params.profile_id)
         profile.like(req.params.post_id, req.user._id)
         await profile.save()
         res.json(profile.posts)
      } catch (err) {
         console.log(err.message)
         res.status(500).send('Server error')
      }
   },
   unlikePost: async (req, res) => {
      try {
         const profile = await Profile.findById(req.params.profile_id)
         profile.unlike(req.params.post_id, req.user._id)
         await profile.save()
         res.json(profile.posts)
      } catch (err) {
         console.log(err.message)
         res.status(500).send('Server error')
      }
   },
   getPost: async (req, res) => {
      try {
         const profile = await Profile.findById(req.params.profile_id)
         const post = profile.posts.find(post => post._id.toString() === req.params.post_id)
         res.json(post)
      } catch (err) {
         console.log(err.message)
         res.status(500).send('Server error')
      }
   },

   commentOnPost: async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
         return res.status(400).json({ errors })
      }

      try {
         const profile = await Profile.findById(req.params.profile_id)
         const post = profile.comment(req)
         await profile.save()
         res.json(post)
      } catch (err) {
         console.log(err.message)
         res.status(500).send('Server error')
      }
   },

   removeCommentOnPost: async (req, res) => {
      try {
         const profile = await Profile.findById(req.params.profile_id)
         const post = await profile.removeComment(req)
         res.json(post)
      } catch (err) {
         console.log(err.message)
         res.status(500).send('Server error')
      }
   }
}