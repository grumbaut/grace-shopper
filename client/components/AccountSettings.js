import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const AccountSettings = ({ user }) => {
  if(!user) return <h1 className='header'>You must be logged in to edit your account settings.</h1>;
  return (
    <div id='style'>
      <h1 className='header'>Account Settings</h1>
      <div>
        <Link to='/account-information'>Account Information</Link>
      </div>
      <div>
        <Link to='/addresses'>Manage Saved Addresses</Link>
      </div>
    </div>
  );
};

const mapState = state => ({
  user: state.user
});

export default connect(mapState)(AccountSettings);
