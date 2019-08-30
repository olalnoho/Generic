import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../../redux/actions/post'
import PostItem from './PostItem';
import PostForm from './PostForm'
import EditPost from './EditPost'
import Modal from '../layout/Modal/Modal'
import PostComment from './PostComment'
const Posts = ({ post: { posts, post, loading }, auth: { user }, getPosts }) => {
   const [show, setShow] = useState(false)
   const [isEdit, setIsEdit] = useState(false)
   useEffect(() => {
      getPosts()
   }, [getPosts, post])
   // loading ? <Spinner /> : 
   return (
      <div className="container" onClick={e => {
         setShow(false)
         setIsEdit(false)
      }}>
         <Modal show={show}>
            <PostComment />
         </Modal>
         <Modal show={isEdit}>
            <EditPost post={post} loading={loading} closeModal={() => setIsEdit(false)}/>
         </Modal>
         <div className="post">
            <h1 className="medium">Here you can make posts everyone can see</h1>
            <PostForm />
            {posts && posts.map(pst =>
               user &&
               <PostItem user={user} showModal={setShow} key={pst._id} post={pst} setEdit={setIsEdit} />)}
         </div>
      </div>
   )
}

const mapStateToProps = state => ({
   post: state.post,
   auth: state.auth,
})
export default connect(mapStateToProps, { getPosts })(Posts)