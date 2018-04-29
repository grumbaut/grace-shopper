import React from 'react';
import { connect } from 'react-redux';

const Users = ({ users })=> {
    return (
        <div>
        {
            users.map(user => <li> { user.firstName } </li>)
        }
        </div>
    )
}

const mapState = ({ users })=> {
    console.log(users)
    return {
        users
    }
}

export default connect(mapState)(Users);