import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { checkout } from '../store';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event, userId, orderId, shippingInfo) {
    event.preventDefault();
    this.props.checkoutCart(userId, orderId, shippingInfo);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { name, address, city, state, zip, email } = this.state;
    const { cart, userId } = this.props;
    if(!cart.id) return null;
    return (
      <div>
        <h1>Checkout</h1>
        <div className='row'>
          <div className='col-2'><strong>Quantity</strong></div>
          <div className='col-6'><strong>Name</strong></div>
          <div className='col-4'><strong>Subtotal</strong></div>
        </div>
        { cart.lineitems.map(item => (
          <div className='row' key={ item.id } >
            <div className='col-2'>{ item.quantity }</div>
            <div className='col-6'>{ item.product.name }</div>
            <div className='col-4'>{ '$' + item.subtotal.toFixed(2) }</div>
          </div>
        ))}
        <p><Link to='/cart'>Edit Cart</Link></p>
        <p><strong>Total: </strong>{ '$' + cart.total }</p>
        <form onSubmit={ event => this.handleSubmit(event, userId, cart.id, this.state) }>
          <div className='form-group'>
            <label htmlFor='name'>Recipient Name: </label>
            <input name='name' value={ name } onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Recipient Email: </label>
            <input name='email' value={ email } onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='address'>Shipping Address: </label>
            <input name='address' value={ address } onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='city'>City: </label>
            <input name='city' value={ city } onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='state'>State: </label>
            <input name='state' value={ state } onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='zip'>Zip Code: </label>
            <input name='zip' value={ zip } onChange={ this.handleChange } />
          </div>
          <button className='btn btn-primary btn-sm'>Submit Order</button>
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  cart: state.cart,
  userId: state.user.id
});

const mapDispatch = (dispatch, { history }) => ({
  checkoutCart(userId, orderId, shippingInfo) {
    dispatch(checkout(userId, orderId, shippingInfo, history));
  }
});

export default connect(mapState, mapDispatch)(Checkout);
