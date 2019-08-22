const express = require('express')
const { check, validationResult } = require('express-validator')
const Profile = require('../db/Profile')
const auth = require('../middleware/auth')
const router = express.Router()

/* 
   --- Profile Schema ---

      User:       ObjectId
      Bio:        String
      Location:   String
      Hobbies:    [String]
      Avatar:     String

      Comments: [
      {
         Text:    String
         User:    ObjectId
         Name:    String
         Avatar:  String
      }
   ]
*/

// Create a profile for logged in user
router.post('/', auth, async (req, res) => {

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
})


// Get logged in users profile
router.get('/', auth, async (req, res) => {
   try {
      const profile = await Profile.findOne({ user: req.user._id })
      if (!profile) {
         return res.status(400).json({ msg: 'No profile for this user' })
      }
      res.json(await profile.populate('user', ['name', 'avatar']).execPopulate())
   } catch (err) {
      res.status(500).send('Server error')
   }
})

router.get('/:user_id', auth, async (req, res) => {
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
})

// Post on users profile
router.post('/:id/comment', [
   check('text', 'Text is required').not().isEmpty(),
   auth
], async (req, res) => {
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
})

// Remove a post on users profile
router.delete('/:profile_id/:post_id', auth, async (req, res) => {
   try {
      const profile = await Profile.findById(req.params.profile_id)
      profile.posts = profile.posts.filter(post => post._id.toString() !== req.params.post_id)
      await profile.save()
      res.json(profile.posts)
   } catch (err) {
      console.log(err.message)
      res.status(500).send('Server error')
   }
})

// Like a post on a users profile
router.put('/like/:profile_id/:post_id', auth, async (req, res) => {
   try {
      const profile = await Profile.findById(req.params.profile_id)
      profile.posts.forEach(post => {
         if (post._id.toString() === req.params.post_id) {
            if (!post.likes.find(like => like.user.toString() == req.user._id.toString())) {
               post.likes.push({ user: req.user._id })
            }
         }
      })
      await profile.save()
      res.json(profile.posts)
   } catch (err) {
      console.log(err.message)
      res.status(500).send('Server error')
   }
})

// Remove like from post on users profile
router.put('/unlike/:profile_id/:post_id', auth, async (req, res) => {
   try {
      const profile = await Profile.findById(req.params.profile_id)
      profile.posts.forEach(post => {
         if (post._id.toString() === req.params.post_id) {
            post.likes = post.likes.filter(like => like.user.toString() !== req.user._id.toString())
         }
      })
      await profile.save()
      res.json(profile.posts)
   } catch (err) {
      console.log(err.message)
      res.status(500).send('Server error')
   }
})

// Get specific post
router.get('/:profile_id/:post_id', auth, async (req, res) => {
   try {
      const profile = await Profile.findById(req.params.profile_id)
      const post = profile.posts.find(post => post._id.toString() === req.params.post_id)
      res.json(post)
   } catch (err) {
      console.log(err.message)
      res.status(500).send('Server error')
   }
})

// Comment on a post
router.post('/:profile_id/:post_id', [
   check('text', 'Text is requird').not().isEmpty(),
   auth
], async (req, res) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors })
   }
   try {
      const profile = await Profile.findById(req.params.profile_id)
      const post = profile.posts.find(post => post._id.toString() === req.params.post_id)

      post.comments.unshift({
         text: req.body.text,
         user: req.user._id,
         name: req.user.name,
         avatar: req.user.avatar
      })

      await profile.save()
      res.json(post)
   } catch (err) {
      console.log(err.message)
      res.status(500).send('Server error')
   }
})

// Remove comment on a post
router.delete('/:profile_id/:post_id/:comment_id', auth, async (req, res) => {
   try {
      const profile = await Profile.findById(req.params.profile_id)

      const post = profile.posts.find(post =>
         post._id.toString() === req.params.post_id
      )

      const comment = post.comments.find(comment =>
         comment._id.toString() == req.params.comment_id
      )

      if (req.user._id == comment.user.toString()) {
         await comment.remove()
      }

      await profile.save()
      res.json(post)
   } catch (err) {
      console.log(err.message)
      res.status(500).send('Server error')
   }
})
module.exports = router