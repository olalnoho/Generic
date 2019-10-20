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
   const [initLoad, setInitLoad] = useState(true)
   
   const openModal = () => {
      setCommentsOpen(true)
   }

   useEffect(() => {
      if(!auth.loading) {
         getProfileById(match.params.id)
         setInitLoad(false)
      }
   }, [getProfileById, auth.loading, match.params.id])
   if(loading || initLoad) {
      return <div className="container">
         <div className="profile">
            <Spinner />
         </div>
      </div>
   }
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
                  <>
                     <ProfileLeft user={auth.user._id} profile={profile} />
                     <ProfileRight guest={true} openModal={openModal} auth={auth} profile={profile} posts={profile.posts} />
                  </>
               </div>
            </div> : <ProfileCreation otheruser />
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
