import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { loginUser } from '../../../redux/actions/auth'
const Login = ({ auth: { isAuth }, loginUser }) => {
   const [formData, setFormData] = useState({
      email: '',
      password: '',
   })

   const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
   const onSubmit = e => {
      e.preventDefault()
      loginUser(formData)
   }

   if (isAuth) return <Redirect to="/" />
   return (
      <div className="container">
         <div className="register">
            <h1 className="large">Login</h1>
            <p className="lead"><i className="fas fa-id-card-alt"></i> Sign in to your account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
               <div className="form__item">
                  <input
                     value={formData.email}
                     name="email"
                     onChange={e => onChange(e)}
                     type="text"
                     placeholder="Email" />
               </div>
               <div className="form__item">
                  <input
                     value={formData.password}
                     name="password"
                     onChange={e => onChange(e)}
                     type="password"
                     placeholder="Password" />
               </div>
               <div className="form__item">
                  <input
                     onChange={e => onChange(e)}
                     type="submit"
                     className="btn btn-primary"
                     value="Login" />
               </div>
            </form>
            <p className="lead">Don't have an account? Register <Link className="register__login" to="/register">here</Link></p>
         </div>
      </div>
   )
}

const mapStateToProps = state => ({
   auth: state.auth,
})

export default connect(mapStateToProps, { loginUser })(Login)
