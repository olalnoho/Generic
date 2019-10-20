import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner/Spinner'
import { postComment, removeComment } from '../../redux/actions/profile'

const PostComments = ({ profile: { profile, post, loading, postLoading }, postComment, removeComment, user }) => {
   const [comment, setComment] = useState('')

   return loading || profile == null || postLoading ? <Spinner /> : <>
         <div key={post._id} className="post__item">
         <div className="profile__comment--user">
            <img className="rounded-img" src={post.avatar} alt="avatar" />
            <h3 className="small"> {post.name} </h3>
            </div>
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
                  <div className="profile__comment--user">
                     <img className="rounded-img" src={comment.avatar} alt="avatar" />
                     <Link to={`/profile/${comment.user}`} ><h3> {comment.name} </h3></Link>
                  </div>
                  <p className="lead">{comment.text}</p>
                  {
                     user._id === comment.user &&
                     <i onClick={e => removeComment(profile._id, post._id, comment._id)} className="fas fa-times"></i>
                  }
               </div>
            )}
         </div>}
      </>
}

const mapStateToProps = state => ({
   profile: state.profile,
   user: state.auth.user
})
export default connect(mapStateToProps, { postComment, removeComment })(PostComments)