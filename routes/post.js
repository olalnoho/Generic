const express = require('express')
const { check } = require('express-validator')
const auth = require('../middleware/auth')
const router = express.Router()
const Controller = require('../controllers/Post')
/*
   --- Post Schema ---

   Text:    String
   User:    ObjectId
   Likes:   [ObjectId]

   Comments: [
      {
         User:    ObjectId
         Text:    String
         Name:    String
         Vatar:   String

      }
   ]
*/

// Create Post
router.post('/', [
   check('text', 'text is required').not().isEmpty(),
   auth
], Controller.create)

// Get all posts
router.get('/', auth, Controller.read)


// Get single post
router.get('/:id', auth, Controller.findById)

// Delete a post
router.delete('/:id', auth, Controller.delete)

// Like a post
router.put('/like/:id', auth, Controller.like)

// Unlike a post
router.put('/unlike/:id', auth, Controller.unlike)

// Comment on a post
router.post('/comment/:id', [
   check('text', 'Text is required').not().isEmpty(),
   auth
], Controller.comment)

// Delete comment on post
router.delete('/comment/:id/:post_id', auth, Controller.deleteComment)


module.exports = router