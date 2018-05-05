import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../store/sessions';

const Nav = ({ user, logout, cart }) => {
  const totalItemsInCart = cart && cart.lineitems ? cart.lineitems.reduce((acc, item) => acc + item.quantity, 0) : 0;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to='/'>Williams-Pomona</NavLink>
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
              user && user.id ? (
                <NavLink to='/' className='nav-link' onClick={ logout }>Logout { user.firstName }</NavLink>
              ) : (
                <NavLink className="nav-link" to="/login" activeClassName='active'>Log In</NavLink>
              )
            }
          </li>
          {
            user.isAdmin === true ?
              <li className="nav-item"><NavLink className="nav-link" to='/admin'>Admin portal</NavLink></li>
              :  <li className="nav-item"><NavLink className="nav-link" to='/support'>Contact Support</NavLink></li>
          }
          <li className='nav-item'>
            {
              user && user.id ? null : (
                <NavLink className='nav-link' to='/signup' activeClassName='active'>Sign Up</NavLink>
              )
            }
          </li>
          <li className="nav-item">
            {
              user && user.id ? <NavLink className="nav-link" to="/cart" activeClassName='active'>Cart {`(${totalItemsInCart})`}</NavLink> : null }
          </li>
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
