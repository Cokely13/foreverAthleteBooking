import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <h1>FS-App-Template</h1>
    <nav>
      {isLoggedIn ? (
        isLoggedIn & isAdmin  ? (
        <div>
          {/* The navbar will show these links after you log in as an admin */}
          <Link to="/home">Home</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/clients">Clients</Link>
          <Link to="/results">Results</Link>
          <Link to="/addresult">AddResult</Link>
          <Link to="/mycalendar">MyCalendar</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) :
      <div>
      {/* The navbar will show these links after you log in but are not an admin */}
      <Link to="/home">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/results">Results</Link>
      <Link to="/addresult">AddResult</Link>
      <Link to="/mycalendar">MyCalendar</Link>
      <a href="#" onClick={handleClick}>
        Logout
      </a>
    </div> ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.admin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
