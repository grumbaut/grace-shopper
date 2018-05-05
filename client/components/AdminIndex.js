import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminIndex = ()=> {
    return(
       <div>
       <h1> Welcome to the Admin Portal! </h1>
       <ul>
           <h4>Product</h4>
           <li><Link to='/createProduct'>Create a new product</Link></li>
           <li><Link to='/products'>Update products</Link></li>
           <h4>Users</h4>
           <li><Link to='/users'>View and Edit Users</Link></li>
           <h4>Orders</h4>
           <li><Link to='/orders'>View orders</Link></li>
       </ul>
       </div>
    )
} 

export default AdminIndex;