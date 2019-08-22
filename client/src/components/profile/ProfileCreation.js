import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createProfile } from '../../redux/actions/profile'
/*
--- Profile Model ---
   User: ObjectId,
   Bio: String,
   Location: String,
   Hobbies: Array of strings,
   Avatar: String, 
*/
const ProfileCreation = ({ createProfile }) => {

   const [formData, setFormData] = useState({
      location: '',
      hobbies: '',
      bio: ''
   })

   const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value })

   const onSubmit = e => {
      e.preventDefault()
      createProfile(formData)
   }
   return (
      <div className="container">
         <div className="profile__creation">
            <h2 className="medium">Looks like you don't have a profile yet. Create one here.</h2>
            <form className="form" onSubmit={e => onSubmit(e)}>
               <div className="form__item">
                  <input onChange={e => onChange(e)} value={formData.location} type="text" name="location" placeholder="Current location" />
               </div>
               <div className="form__item">
                  <input onChange={e => onChange(e)} value={formData.hobbies} type="text" name="hobbies" placeholder="Some of your hobbies. Please use a comma to seperate them" />
               </div>
               <div className="form__item">
                  <textarea onChange={e => onChange(e)} value={formData.bio} name="bio" cols="30" rows="10" placeholder="A little information about yourself."></textarea>
               </div>
               <div className="form__item">
                  <input className="btn btn-primary" type="submit" value="Create profile" />
               </div>
            </form>
         </div>
      </div>
   )
}

const mapStateToProps = state => ({
   profile: state.profile
})

export default connect(mapStateToProps, { createProfile })(ProfileCreation)
