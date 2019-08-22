import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost, likePost, unlikePost, getPost } from '../../redux/actions/profile'
// Try using the post in redux state to get instant update on comment count.
const PostItem = ({ auth, profile: { profile }, deletePost, likePost, unlikePost, getPost, post, openModal }) => {
   return (
      <div key={post._id} className="profile__post">
         <img src={post.avatar} alt="avatar" />
         <Link to={`/profile/${post.user}`} ><h3> {post.name} </h3></Link>
         <p className="lead">{post.text}</p>
         <div className="post__icons">
            <div className="like">
               {post.likes.length} <i onClick={e => likePost(profile._id, post._id)} className="fas fa-thumbs-up mr"></i>
               <i onClick={e => unlikePost(profile._id, post._id)} className="fas fa-thumbs-down"></i>
            </div>
            <i onClick={e => {
               getPost(profile._id, post._id)
               openModal(post._id)
               // Maybe do this another way?
               // Stoping Propagation so often might be bad?
               e.stopPropagation()
            }} className="fas fa-comment">{' ' + post.comments.length}</i>
            {auth.user._id === profile.user._id ?
               <i onClick={e => deletePost(profile._id, post._id)} className="fas fa-times"></i> : <i></i>}
         </div>
      </div>
   )
}

const mapStateToProps = state => ({
   auth: state.auth,
   profile: state.profile
})

export default connect(mapStateToProps, { deletePost, likePost, unlikePost, getPost })(PostItem)
