import React, { Component } from 'react';
import { connect } from 'react-redux';

const AdminIndex = ()=> {
    return(
        <h1>hi!</h1>
    )
}

const mapState = ()=> {

}

export default connect(mapState)(AdminIndex);