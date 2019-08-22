import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postComment, removeComment } from '../../redux/actions/profile'

const PostComments = ({ profile: { profile, post, loading }, postComment, removeComment, user }) => {
   const [comment, setComment] = useState('')
   return !loading && profile !== null && (
      <>
         <div key={post._id} className="post__item">
            <img src={post.avatar} alt="avatar" />
            <h2 className="small"> {post.name} </h2>
            <p className="lead">{post.text}</p>
         </div>
         <form className="profile__form" onSubmit={e => {
            e.preventDefault()
            postComment(profile._id, post._id, comment)
            setComment('')
         }
         }>
            <input value={comment}
               onChange={e => setComment(e.target.value)}
               type="text"
               placeholder={`Comment on ${post.name}'s post`} />
            <input type="submit" value="Post" className="btn btn-primary" />
         </form>
         {post.comments && <div className="profile__comments">
            {post.comments.map(comment =>
               <div key={comment._id} className="profile__comment">
                  <img src={comment.avatar} alt="avatar" />
                  <Link to={`/profile/${comment.user}`} ><h3> {comment.name} </h3></Link>
                  <p className="lead">{comment.text}</p>
                  {
                     user._id === comment.user &&
                     <i onClick={e => removeComment(profile._id, post._id, comment._id)} className="fas fa-times"></i>
                  }
               </div>
            )}
         </div>}
      </>
   )
}

const mapStateToProps = state => ({
   profile: state.profile,
   user: state.auth.user
})
export default connect(mapStateToProps, { postComment, removeComment })(PostComments)