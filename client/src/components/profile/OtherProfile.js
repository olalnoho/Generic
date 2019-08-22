import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getProfileById } from '../../redux/actions/profile'
import ProfileCreation from './ProfileCreation'
import ProfileRight from './ProfileRight'
import ProfileLeft from './ProfileLeft'
import Modal from '../layout/Modal/Modal'
import PostComments from './PostComments'
import Spinner from '../layout/Spinner/Spinner'

const Profile = ({
   profile: { profile, loading, post },
   auth,
   getProfileById,
   match,
}) => {
   const [commentsOpen, setCommentsOpen] = useState(false)

   const openModal = () => {
      setCommentsOpen(true)
   }

   useEffect(() => {
      !auth.loading && getProfileById(match.params.id)
   }, [getProfileById, auth.loading, match.params.id])

   return loading && profile === null ? <Spinner /> :
      <>
         {profile ?
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
export default connect(mapStateToProps, {
   getProfileById,
})(Profile)
