import React from 'react';
import { connect } from 'react-redux';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
  }

  render() {
    return (
      <div>
        <h1>Cart</h1>
      </div>
    );
  }
}

export default Cart;
