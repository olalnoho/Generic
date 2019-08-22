import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../../../redux/actions/auth'
import Searchbar from '../../searchbar/Searchbar';

const Navbar = ({ auth: { isAuth, loading }, logout }) => {
   const authLinks = (
      <ul className="navbar__links">
         <li><Link to="/chat">Chat</Link></li>
         <li><Link to="/posts">Message board</Link></li>
         <li><Link to="/profile">Profile</Link></li>
         <li><a onClick={logout} href="#!">Logout</a></li>
      </ul>
   )

   const guestLinks = (
      <ul className="navbar__links">
         <li><Link to="/register">Register</Link></li>
         <li><Link to="/login">Login</Link></li>
      </ul>
   )
   return (
      <nav className="navbar">
         <Link to="/" ><h2 className="navbar__heading">
            <i className="fas fa-crop"></i> Hello
         </h2></Link>
         {!loading && isAuth && <Searchbar />}
           {!loading && isAuth ? authLinks : guestLinks}
      </nav>
   )
}
const mapStateToProps = state => ({
   auth: state.auth
})
export default connect(mapStateToProps, { logout })(Navbar)
