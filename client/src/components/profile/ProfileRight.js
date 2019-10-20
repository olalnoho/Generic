import React, { useState } from 'react'
import { connect } from 'react-redux'
import { postProfile } from '../../redux/actions/profile'
import PostItem from './PostItem'
import Spinner from '../layout/Spinner/Spinner'
const ProfileRight = ({ postProfile, profile, posts, auth, openModal, openEdit, guest, profileLoading }) => {

   const [text, setText] = useState('')
   const onSubmit = e => {
      e.preventDefault()
      postProfile(profile._id, text)
      setText('')
   }

   return (
      <>
         {auth.loading && !profileLoading ? <Spinner /> :
            <div className="profile__right">
               <h3 className="large"> {guest ? `Tell ${profile.user.name} something... ` : "What's on your mind..." }  </h3>
               <form className="profile__form" onSubmit={e => onSubmit(e)}>
                  <input value={text} onChange={e => setText(e.target.value)} type="text" placeholder="Say something" />
                  <input type="submit" value="Post" className="btn btn-primary" />
               </form>
               {posts &&
                  <div className="profile__posts">
                     {posts.map((post, i) =>
                        <PostItem
                           openEdit={openEdit}
                           openModal={openModal}
                           profile={profile}
                           auth={auth}
                           userId={auth.user._id}
                           key={post._id}
                           post={post}
                        />)}
                  </div>
               }
            </div>
         }
      </>
   )
}

const mapStateToProps = state => ({
   posts: state.profile.posts,
   auth: state.auth,
   profileLoading: state.profile.loading
})

export default connect(mapStateToProps, { postProfile })(ProfileRight)
