import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/sessions';

const Nav = ({ user, logout, cart }) => {
  const totalItemsInCart = cart && cart.lineitems ? cart.lineitems.reduce((acc, item) => acc + item.quantity, 0) : 0;
  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-background">
      <NavLink className="navbar-brand header" to='/'>Williams-Pomona</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {
            user && user.id ?
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Account
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink className="dropdown-item" to='/manage-orders' activeClassName='active'>Manage Orders</NavLink>
                  <NavLink className="dropdown-item" to='/account-settings' activeClassName='active'>Account Settings</NavLink>
                  <NavLink className="dropdown-item" to='/logged-out' activeClassName='active' onClick={ logout }>Logout { user.firstName }</NavLink>
                </div>
              </li>
              :
              null
          }
          {
            user && user.isAdmin ?
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Admin
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink className="dropdown-item" to='/createproduct' activeClassName='active'>Create New Product</NavLink>
                  <NavLink className="dropdown-item" to='/products' activeClassName='active'>Update Products</NavLink>
                  <NavLink className="dropdown-item" to='/users' activeClassName='active'>View and Update Users</NavLink>
                  <NavLink className="dropdown-item" to='/orders' activeClassName='active'>Manage Orders</NavLink>
                </div>
              </li>
              :
              <NavLink className="nav-link" to='/support'>Contact Support</NavLink>
          }
          <li className="nav-item">
            <NavLink className="nav-link" to='/categories' activeClassName='active'>Categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to='/products' activeClassName='active'>Products</NavLink>
          </li>
          <li className="nav-item">
            {
              user && user.id ? <NavLink className="nav-link" to="/cart" activeClassName='active'>Cart {`(${totalItemsInCart})`}</NavLink> : null }
          </li>
          <li className='nav-item'>
            {
              user && user.id ? null : (
                <NavLink className='nav-link' to='/signup' activeClassName='active'>Sign Up</NavLink>
              )
            }
          </li>
          {
            user && user.id ? (
              null
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login" activeClassName='active'>Log In</NavLink>
              </li>
            )
          }
        </ul>
      </div>
    </nav>
  );
};

const mapState = state => {
  return {
    user: state.user,
    cart: state.cart
  };
};

const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapState, mapDispatch)(Nav);
