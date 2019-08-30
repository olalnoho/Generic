import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { updatePost } from '../../redux/actions/post'
const EditPost = ({ post, loading, updatePost, closeModal }) => {
   const [text, setText] = useState('')

   const onChange = e => {
      setText(e.target.value)
   }

   useEffect(() => {
      post && setText(post.text)
   }, [post])
   return (post && !loading && <div>
      <div className="post__item">
         <div className="profile__comment--user">
            <img className="rounded-img" src={post.avatar} alt="" />
            <h3 className="small">{post.name}</h3>
         </div>
         <textarea className="lead" onChange={e => onChange(e)} value={text} />
         <input
            onClick={e => {
               updatePost(post._id, text)
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
