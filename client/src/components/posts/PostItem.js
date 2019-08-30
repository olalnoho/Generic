import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPost, likePost, unlikePost, removePost } from '../../redux/actions/post'

// Fix UserID, looks bad.

const PostItem = ({
   post: { text, avatar, user, name, likes, comments, _id: id },
   user: { _id }, // wtf
   showModal,
   getPost,
   likePost,
   unlikePost,
   removePost,
   setEdit
}) => {

   const [showAll, setShowAll] = useState(false)
   return (
      <>
         <div className="post__item">
            <div className="post__item--user">
               <img className="rounded-img" src={avatar} alt="" />
               <Link to={`/profile/${user._id}`}> <h2 className="small">{name}</h2></Link>
            </div>
            <div className="post__text">
               {text.length > 100 && !showAll ?
                  <>
                     <p className="lead">{text.slice(0, 100) + '...'}</p> <br /> <p className="post__more" onClick={() => setShowAll(!showAll)}>See more</p>
                  </> :
                  <>
                     <p className="lead">{text}</p>
                     {text.length > 50 && <p className="post__more" onClick={e => setShowAll(!showAll)}>See less</p>}
                  </>
               }
            </div>
            <div className="post__actions">
               <div className="post__likes">
                  <i className="fas fa-thumbs-up mr" onClick={e => likePost(id)}> {likes.length}  </i>
                  <i className="fas fa-thumbs-down" onClick={e => unlikePost(id)}></i>
               </div>
               <div className="post__comments">
                  <i onClick={e => {
                     getPost(id)
                     e.stopPropagation()
                     showModal(true)
                  }} className="fas fa-comment"> {comments.length} </i>
               </div>
               {
                  _id === user._id &&
                  <div className="post__actions--user">
                     <i onClick={e => {
                        getPost(id)
                        setEdit(true)
                        e.stopPropagation()
                     }} className="fas fa-pencil-ruler"></i>
                     <i onClick={e => removePost(id)} className="fas fa-times"></i>
                  </div>
               }
            </div>
         </div>
      </>
   )
}

export default connect(null, { getPost, likePost, unlikePost, removePost })(PostItem)
