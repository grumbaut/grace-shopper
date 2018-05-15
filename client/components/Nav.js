import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/sessions';

const Nav = ({ user, logout, cart }) => {
  const totalItemsInCart = cart && cart.lineitems ? cart.lineitems.reduce((acc, item) => acc + item.quantity, 0) : 0;
  return (
    <div className="navbar navbar-expand-lg navbar-light navbar-background">
      <NavLink className="navbar-brand header" to='/'>Williams-Pomona</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav ml-auto">
          {
            user && user.id ?
              <div className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Account
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink className="dropdown-item" to='/manage-orders' activeClassName='active'>Manage Orders</NavLink>
                  <NavLink className="dropdown-item" to={`/account-settings`} activeClassName='active'>Account Settings</NavLink>
                  <NavLink className="dropdown-item" to='/logged-out' activeClassName='active' onClick={ logout }>Logout { user.firstName }</NavLink>
                </div>
              </div>
              :
              null
          }
          {
            user && user.isAdmin ?
              <div className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Admin
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <NavLink className="dropdown-item" to='/createproduct' activeClassName='active'>Create New Product</NavLink>
                  <NavLink className="dropdown-item" to='/createcategory' activeClassName='active'>Create New Category</NavLink>
                  <NavLink className="dropdown-item" to='/admin-categories-products' activeClassName='active'>Update Categories & Products</NavLink>
                  <NavLink className="dropdown-item" to='/users' activeClassName='active'>View and Update Users</NavLink>
                  <NavLink className="dropdown-item" to='/orders' activeClassName='active'>Manage Orders</NavLink>
                </div>
              </div>
              :
              null
          }
          <div className="nav-item">
            <NavLink className="nav-link" to='/categories' activeClassName='active'>Categories</NavLink>
          </div>
          <div className="nav-item">
            <NavLink className="nav-link" to='/products' activeClassName='active'>Products</NavLink>
          </div>
          <div className="nav-item">
            {
              user && user.id ? (
                <NavLink to='/' className='nav-link' onClick={ logout }>Logout { user.firstName }</NavLink>
              ) : (
                <NavLink className="nav-link" to="/login" activeClassName='active'>Log In</NavLink>
              )
            }
          </div>
          <div>
            { user && user.id ? <NavLink className="nav-link" to="/cart" activeClassName='active'>Cart {`(${totalItemsInCart})`}</NavLink> : null }

          </div>
          <div className='nav-item'>
            {
              user && user.id ? null : (
                <NavLink className='nav-link' to='/signup' activeClassName='active'>Sign Up</NavLink>
              )
            }
          </div>
        </div>
      </div>
    </div>
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
