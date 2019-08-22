import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getProfile } from '../../redux/actions/profile'
import ProfileCreation from './ProfileCreation'
import ProfileRight from './ProfileRight'
import ProfileLeft from './ProfileLeft'
import Modal from '../layout/Modal/Modal'
import PostComments from './PostComments'
import Spinner from '../layout/Spinner/Spinner'

const Profile = ({
   profile: { profile, loading, post },
   auth,
   getProfile,
   match
}) => {
   const [commentsOpen, setCommentsOpen] = useState(false)
   useEffect(() => {
      getProfile()
   }, [getProfile, post])
   const openModal = () => {
      setCommentsOpen(true)
   }
   return loading && profile === null ? <Spinner /> :
      <>
         {profile && auth.user ?
            <div className="container">
               <div className="profile" onClick={(e) => {
                  setCommentsOpen(false)
               }}>
                  {commentsOpen && <Modal show={commentsOpen}>
                     <PostComments post={post} />
                  </Modal>}
                  {loading ? <Spinner /> : <>
                     <ProfileLeft user={auth.user._id} profile={profile} />
                     <ProfileRight openModal={openModal} auth={auth} profile={profile} posts={profile.posts} />
                  </>}
               </div>
            </div> : <ProfileCreation />
         }
      </>
}

const mapStateToProps = state => ({
   profile: state.profile,
   auth: state.auth,
})
export default connect(mapStateToProps, { getProfile })(Profile)
