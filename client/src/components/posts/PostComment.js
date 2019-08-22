import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { commentPost, removeCommentPost } from '../../redux/actions/post'

//import Spinner from '../layout/Spinner/Spinner'

const PostComment = ({ post: { post, loading }, auth: { user }, commentPost, removeCommentPost }) => {
   const [text, setText] = useState('')
   return post && !loading &&
      <div>
         <div className="post__item">
            <div className="profile__comment--user">
               <img className="rounded-img" src={post.avatar} alt="" />
               <h3 className="small">{post.name}</h3>
            </div>
            <p className="lead"> {post.text} </p>
         </div>

         <form className="profile__form" onSubmit={e => {
            e.preventDefault()
            if (text) {
               commentPost(post._id, text)
               setText('')
            }
         }}>
            <input
               type="text"
               placeholder={`Comment on ${post.name}'s post`}
               value={text}
               onChange={e => setText(e.target.value)} />
            <input type="submit" className="btn btn-primary" value={'Post comment'} />
         </form>

         {post.comments && <div className="post__comments">
            {post.comments.map(comment =>
               <div key={comment._id} className="profile__comment">
                  <div className="profile__comment--user">
                     <img className="rounded-img" src={comment.avatar} alt="avatar" />
                     <Link to={`/profile/${comment.user}`} ><h3> {comment.name} </h3></Link>
                  </div>
                  <p className="lead">{comment.text}</p>
                  {
                     user._id === comment.user &&
                     <i onClick={e => removeCommentPost(post._id, comment._id)} className="fas fa-times"></i>
                  }
               </div>
            )}
         </div>}
      </div>
}

const mapStateToProps = state => ({
   post: state.post,
   auth: state.auth,
})

export default connect(mapStateToProps, { commentPost, removeCommentPost })(PostComment)


   // return loading ? <Spinner /> : 
   // <>
   //    <h1> {post.text} </h1>
   // </>