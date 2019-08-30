import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost, likePost, unlikePost, getPost } from '../../redux/actions/profile'
// Try using the post in redux state to get instant update on comment count.
const PostItem = ({
   auth,
   profile: { profile },
   deletePost,
   likePost,
   unlikePost,
   getPost,
   post,
   openModal,
   openEdit
}) => {
   const [showAll, setShowAll] = useState(false)
   return (
      <div key={post._id} className="profile__post">
         <div className="post__item--user">
            <img className="rounded-img" src={post.avatar} alt="avatar" />
            <Link to={`/profile/${post.user}`} ><h3> {post.name} </h3></Link>
         </div>
         <p className="lead">
            {post.text.length > 100 && !showAll ?
               <>
                  <span className="lead">{post.text.slice(0, 100) + '...'}</span>
                  <br />
                  <span className="post__more" onClick={() => setShowAll(!showAll)}>See more
                     </span>
               </> :
               <>
                  <span className="lead">{post.text}</span>
                  {post.text.length > 50 && <span className="post__more" onClick={e => setShowAll(!showAll)}>See less</span>}
               </>
            }
         </p>
         <div className="post__icons">
            <div className="like">
               {post.likes.length} <i onClick={e => likePost(profile._id, post._id)} className="fas fa-thumbs-up mr"></i>
               <i onClick={e => unlikePost(profile._id, post._id)} className="fas fa-thumbs-down"></i>
            </div>
            <i onClick={e => {
               getPost(profile._id, post._id)
               openModal(post._id)
               e.stopPropagation()
            }}
               className="fas fa-comment"> {' ' + post.comments.length} </i>
            {auth.user._id === profile.user._id &&
               <div className="post__icons--user">
                  <i onClick={e => {
                     getPost(profile._id, post._id)
                     openEdit(true)
                     e.stopPropagation()
                  }} className="fas fa-pencil-ruler"></i>
                  <i onClick={e => deletePost(profile._id, post._id)} className="fas fa-times"></i>
               </div>
            }
         </div>
      </div>
   )
}

const mapStateToProps = state => ({
   auth: state.auth,
   profile: state.profile
})

export default connect(mapStateToProps, { deletePost, likePost, unlikePost, getPost })(PostItem)
