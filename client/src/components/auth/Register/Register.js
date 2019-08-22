import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { registerUser } from '../../../redux/actions/auth'

const Register = ({ registerUser, auth: { isAuth } }) => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
   })
   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
   const onSubmit = e => {
      e.preventDefault()
      registerUser(formData)
   }

   if (isAuth) return <Redirect to="/" />
   return (
      <div className="container">
         <div className="register">
            <h1 className="large">Register</h1>
            <p className="lead"><i className="fas fa-id-card-alt"></i> Make an account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
               <div className="form__item">
                  <input
                     value={formData.name}
                     onChange={e => onChange(e)}
                     type="text"
                     name="name"
                     placeholder="Name" />
               </div>

               <div className="form__item">
                  <input
                     value={formData.email}
                     onChange={e => onChange(e)}
                     type="text"
                     name="email"
                     placeholder="Email" />
               </div>
               <div className="form__item">
                  <input
                     value={formData.password}
                     onChange={e => onChange(e)}
                     type="password"
                     name="password"
                     placeholder="Password" />
               </div>
               <div className="form__item">
                  <input type="submit" className="btn btn-primary" value="Register" />
               </div>
            </form>
            <p className="lead">Already made an account? Sign in <Link className="register__login" to="/login">here</Link></p>
         </div>
      </div>
   )
}

const mapStateToProps = state => ({
   auth: state.auth,
})

export default connect(mapStateToProps, { registerUser })(Register)
