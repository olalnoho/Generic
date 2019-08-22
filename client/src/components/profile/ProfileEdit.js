import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createProfile, getProfile } from '../../redux/actions/profile'
/*
--- Profile Model ---
   User: ObjectId,
   Bio: String,
   Location: String,
   Hobbies: Array of strings,
   Avatar: String, 
*/
const ProfileEdit = ({ createProfile, getProfile, profile: { profile, loading }, history }) => {

   const [formData, setFormData] = useState({
      location: '',
      hobbies: '',
      bio: ''
   })

   useEffect(() => {
      // Loads the current profile values and sets the fields with current information.
      getProfile()
      profile && setFormData({
         location: profile.location ? profile.location : '',
         hobbies: profile.hobbies ? profile.hobbies.join(', ') : '',
         bio: profile.bio ? profile.bio : ''
      })

      // If profile is included in [dependencies] it gets stuck in loop,
      // hence why the linter is disabled here.

      // eslint-disable-next-line
   }, [getProfile, loading])

   const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value })

   const onSubmit = e => {
      e.preventDefault()
      // Create Profile creates or updates a profile resource
      // So it's fine to be used here.
      createProfile(formData)
      history.push('/profile')
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
                  <input className="btn btn-primary" type="submit" value="Make edits" />
               </div>
            </form>
         </div>
      </div>
   )
}

const mapStateToProps = state => ({
   profile: state.profile,
})

export default connect(mapStateToProps, { createProfile, getProfile })(ProfileEdit)
