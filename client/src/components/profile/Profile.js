import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getProfile } from '../../redux/actions/profile'
import ProfileCreation from './ProfileCreation'
import ProfileRight from './ProfileRight'
import ProfileLeft from './ProfileLeft'
import Modal from '../layout/Modal/Modal'
import PostComments from './PostComments'
import Spinner from '../layout/Spinner/Spinner'
import EditPost from './EditPost'

const Profile = ({
   profile: { profile, loading, post },
   auth,
   getProfile,
   match
}) => {
   const [commentsOpen, setCommentsOpen] = useState(false)
   const [isEdit, setIsEdit] = useState(false)
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
                  setIsEdit(false)
               }}>
                  {commentsOpen && <Modal show={commentsOpen}>
                     <PostComments post={post} />
                  </Modal>}
                  {isEdit && <Modal show={isEdit}>
                     <EditPost post={post} profile={profile} closeModal={e => setIsEdit(false)}/>
                  </Modal>}
                  <>
                     <ProfileLeft user={auth.user._id} profile={profile} />
                     <ProfileRight
                        openEdit={setIsEdit}
                        openModal={openModal}
                        auth={auth}
                        profile={profile}
                        posts={profile.posts} />
                  </>
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
