import React from 'react';
import { connect } from 'react-redux';

class Checkout extends React.Component {

}

const mapState = state => ({
  cart: state.cart
});

const mapDispatch = null;

export default connect(mapState, mapDispatch)(Checkout);
