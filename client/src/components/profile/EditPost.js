import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { updatePost } from '../../redux/actions/profile'
const EditPost = ({ post, profile, updatePost, closeModal }) => {
   const [text, setText] = useState('')

   useEffect(() => {
      post && setText(post.text)
   }, [post])
   return (post && profile && <div>
      <div className="post__item">
         <div className="profile__comment--user">
            <img className="rounded-img" src={post.avatar} alt="" />
            <h3 className="small">{post.name}</h3>
         </div>
         <textarea className="lead" onChange={e => setText(e.target.value)} value={text} />
         <input
            onClick={e => {
               updatePost(profile._id, post._id, text)
               closeModal()
            }}
            type="submit"
            className="btn btn-primary"
            value="Edit" />
      </div>
   </div>
   )
}

export default connect(null, { updatePost })(EditPost)
