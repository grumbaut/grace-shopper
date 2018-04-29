import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminIndex = ()=> {
    return(
       <div>
       <h1> Welcome to the Admin Portal! </h1>
       <ul>
           <li><Link to='/createProduct'>Create a new product</Link></li>
           <li><Link to='/products'>Update products</Link></li>
           <li><Link to='/users'>View users</Link></li>
           <li><Link to='/orders'>View orders</Link></li>
       </ul>
       </div>
    )
} 

export default AdminIndex;