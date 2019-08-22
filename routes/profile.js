const express = require('express')
const { check } = require('express-validator')
const auth = require('../middleware/auth')
const router = express.Router()
const Controller = require('../controllers/Profile')

router.post('/', auth, Controller.createProfile)

router.get('/', auth, Controller.getProfile)

router.get('/:user_id', auth, Controller.getUserProfile)

router.post('/:id/comment', [
   check('text', 'Text is required').not().isEmpty(),
   auth
], Controller.postOnProfile)

router.delete('/:profile_id/:post_id', auth, Controller.removePost)

router.put('/like/:profile_id/:post_id', auth, Controller.likePost)

router.put('/unlike/:profile_id/:post_id', auth, Controller.unlikePost)

router.get('/:profile_id/:post_id', auth, Controller.getPost)

router.post('/:profile_id/:post_id', [
   check('text', 'Text is requird').not().isEmpty(),
   auth
], Controller.commentOnPost)

router.delete('/:profile_id/:post_id/:comment_id', auth, Controller.removeCommentOnPost)

module.exports = router