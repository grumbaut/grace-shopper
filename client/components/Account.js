import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Account = ({ name }) => (
  <div>
    <h2>Account Details: { name }</h2>
    <div><NavLink to='/manage-account'>Manage Account</NavLink></div>
    <div><NavLink to='/manage-orders'>Manage Orders</NavLink></div>
  </div>
);

const mapState = state => ({
  name: state.user.name
});

export default connect(mapState)(Account);

