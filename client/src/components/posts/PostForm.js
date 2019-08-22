import React, { useState } from 'react'
import { connect } from 'react-redux'
import { postPosts } from '../../redux/actions/post'
const PostForm = ({ postPosts }) => {
   const [text, setText] = useState('')
   const onSubmit = e => postPosts(text)

   return (
      <form className="profile__form" onSubmit={e => {
         e.preventDefault()
         onSubmit(e)
         setText('')
      }}>
         <input value={text} onChange={e => setText(e.target.value)} type="text" placeholder="Say something" />
         <input type="submit" value="Post" className="btn btn-primary" />
      </form>
   )
}

export default connect(null, { postPosts })(PostForm)
