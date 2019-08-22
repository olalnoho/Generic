import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
   return <Route {...rest} render={props =>
      localStorage.getItem('isAuth') ?
         <Component {...props} /> :
         <Redirect to="/login" />} />
}

const mapStateToProps = state => ({
   auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)