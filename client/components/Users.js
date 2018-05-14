import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../store';
import map from './D3map';

class Users extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { getUsers, user } = this.props;
    if(user.isAdmin) {
      getUsers();
    }
  }

  render() {
    const { users, user } = this.props;
    const D3map =  map? map(): null;
    if(!user || !user.isAdmin) return <h1>You are not authorized to access this page.</h1>;
    return (
      <div>
        <h3> Users </h3>
        <div>
          <ul>
            {
              users.map(user => <li key = {user.id}><Link to={`/users/${user.id}`}>{ user.firstName } { user.lastName }</Link></li>)
            }
          </ul>
          <div id="container" style={{position: 'relative', width: '500px', height: '300px'}} />
          <div>{D3map}</div>/>
        </div>
      </div>
    );
  }
}

const mapState = ({ users, user } ) => {
  return {
    users,
    user
  };
};

const mapDispatch = dispatch => ({
  getUsers(){
    dispatch(getUsers());
  }
});

export default connect(mapState, mapDispatch)(Users);
