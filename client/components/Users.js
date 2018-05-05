import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = ({ users })=> {
    return (
        <div>
        <h3> Users </h3>
        <ul>
         {
             users.map(user => <li key = {user.id}><Link to={`/users/${user.id}`}>{ user.firstName } { user.lastName }</Link>   </li>)
         }
        </ul>
        </div>
    )   
}

const mapState = ({ users } ) => {
    return {
        users
    }
}


export default connect(mapState)(Users);