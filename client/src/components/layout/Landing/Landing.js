import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const Landing = ({ auth }) => {
   const authLinks = (
      <div className="landing__buttons">
         <Link to="/profile" className="btn btn-primary">Profile</Link>
         <Link to="/posts" className="btn btn-grey">Message Board</Link>
      </div>
   )

   const guestLinks = (
      <div className="landing__buttons">
         <Link to="/register" className="btn btn-primary">Sign up</Link>
         <Link to="/login" className="btn btn-grey">Login</Link>
      </div>
   )


   return (
      <div className="landing">
         <h1 className="x-large">Generic social media network</h1>
         <p className="lead">It's just too hard to come up with original ideas!  </p>
         {auth.isAuth ? authLinks : guestLinks}
      </div>
   )
}

const mapStateToProps = state => ({
   auth: state.auth
})

export default connect(mapStateToProps)(Landing)
