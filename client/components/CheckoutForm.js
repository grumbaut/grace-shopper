import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { checkout } from '../store';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validators = {
      firstName: value => {
        if(!value) return 'First name is required.';
      },
      lastName: value => {
        if(!value) return 'Last name is required.';
      },
      email: value => {
        if(!value) return 'Email is required.';
      },
      address: value => {
        if(!value) return 'Address is required.';
      },
      city: value => {
        if(!value) return 'City is required.';
      },
      state: value => {
        if(!value) return 'State is required.';
      },
      zip: value => {
        if(!value) return 'Zip code is required.';
      }
    };
  }

  handleSubmit(event, userId, orderId, shippingInfo) {
    event.preventDefault();
    const errors = Object.keys(this.validators).reduce((memo, key) => {
      const validator = this.validators[key];
      const value = this.state[key];
      const error = validator(value);
      if(error) {
        memo[key] = error;
      }
      return memo;
    }, {});
    this.setState({ errors });
    if(Object.keys(errors).length) {
      return;
    }

    this.props.checkoutCart(userId, orderId, shippingInfo);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { firstName, lastName, address, city, state, zip, email, errors } = this.state;
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
            <label htmlFor='name'>Recipient First Name: </label>
            <input name='firstName' value={ firstName } onChange={ this.handleChange } />
            <p className='error'>{ errors.firstName }</p>
          </div>
          <div className='form-group'>
            <label htmlFor='name'>Recipient Last Name: </label>
            <input name='lastName' value={ lastName } onChange={ this.handleChange } />
            <p className='error'>{ errors.lastName }</p>
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Recipient Email: </label>
            <input name='email' value={ email } onChange={ this.handleChange } />
            <p className='error'>{ errors.email }</p>
          </div>
          <div className='form-group'>
            <label htmlFor='address'>Shipping Address: </label>
            <input name='address' value={ address } onChange={ this.handleChange } />
            <p className='error'>{ errors.address }</p>
          </div>
          <div className='form-group'>
            <label htmlFor='city'>City: </label>
            <input name='city' value={ city } onChange={ this.handleChange } />
            <p className='error'>{ errors.city }</p>
          </div>
          <div className='form-group'>
            <label htmlFor='state'>State: </label>
            <input name='state' value={ state } onChange={ this.handleChange } />
            <p className='error'>{ errors.state }</p>
          </div>
          <div className='form-group'>
            <label htmlFor='zip'>Zip Code: </label>
            <input name='zip' value={ zip } onChange={ this.handleChange } />
            <p className='error'>{ errors.zip }</p>
          </div>
          <div className='form-group'>
            <CardElement style={{base: {fontSize: '18px'}}} />
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

export default connect(mapState, mapDispatch)(injectStripe(Checkout));
