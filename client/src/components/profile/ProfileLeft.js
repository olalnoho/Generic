import React from 'react'
import { Link } from 'react-router-dom'
import ProfileHobbies from './ProfileHobbies'

const ProfileLeft = ({ profile, user }) => {
   return (
      <div className="profile__left">
         <div className="profile__user">
            <img className="profile__img rounded-img" src={profile.user.avatar} alt="" />
            <h3 className="medium"> {profile.user.name}'s Profile </h3>
         </div>
         <div className="profile__bio">
            <h2>About me</h2>
            <p className="lead">{profile.bio} </p>
         </div>
         <div className="profile__hobbies">
            <ProfileHobbies hobbies={profile.hobbies} />
         </div>
         {user === profile.user._id &&
            <div className="profile__editbutton">
               <Link to="/profile-edit" className="btn btn-primary">Edit profile</Link>
            </div>}
      </div>
   )
}

export default ProfileLeft
