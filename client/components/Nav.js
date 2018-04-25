import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/sessions'
import { loggedIn } from './Login'

//have left <a></a> on the logout portion for now - needs formatting

const Nav = ({ user }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <NavLink className="navbar-brand" to='/'>Name Goes Here</NavLink>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <NavLink className="nav-link" to='/'>Home <span className="sr-only">(current)</span></NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/categories'>Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to='/products'>Products</NavLink>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
        {
          loggedIn ? (
            <a onClick =  { logout }> Logout { user.firstName } </a>
          ) : (
            <NavLink className="nav-link" to="/login" activeClassName='active'>Log In</NavLink>
          )
        }
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/cart" activeClassName='active'>Cart</NavLink>
        </li>
      </ul>
    </div>
  </nav>
);

const mapState = ({ user }) => {
  //const loggedIn = !!user.id
  return {
    //loggedIn,
    user
  }
}

const mapDispatch = (dispatch) => {
  return {
    logout: ()=> dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(Nav);
