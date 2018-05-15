import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { checkout, updateOrder } from '../store';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billingFirstName: '',
      billingLastName: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      addressId: 0,
      payment: false,
      errors: {},
      discount: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePaymentChange = this.handlePaymentChange.bind(this);
    this.changePromo = this.changePromo.bind(this)

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.validators = {
      billingFirstName: value => {
        if(!value) return 'First name is required.';
      },
      billingLastName: value => {
        if(!value) return 'Last name is required.';
      },
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
      },
      payment: value => {
        if(!value) return 'Payment information is required.';
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
    const name = `${this.state.billingFirstName} ${this.state.billingLastName}`;
    const discount = this.state.discount
    this.props.stripe.createToken({type: 'card', name })
      .then(({token}) => {
        const orderInfo = { shippingInfo, token };
        const orderUpdate = { discount }
        this.props.checkoutCart(userId, orderId, orderInfo, orderUpdate);
      });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handlePaymentChange(event) {
    this.setState({ payment: event.complete });
  }

  changePromo(event){
    const code = event.target.value
    const promoCode2Apply = this.props.promoCodes.find(promoCode => promoCode.password === code)
    
    if(promoCode2Apply.valid){
      const discount = promoCode2Apply.discount
      this.setState({ discount })
    }
  }
  handleDropdownChange(event){
    this.setState({ addressId: event.target.value });
    const addressInfo = this.props.addresses.find(address => address.id === Number(event.target.value));
    this.setState({
      firstName: addressInfo.firstName,
      lastName: addressInfo.lastName,
      address: addressInfo.address,
      email: addressInfo.email,
      city: addressInfo.city,
      state: addressInfo.state,
      zip: addressInfo.zip
    });
  }
  render(){
    const { billingFirstName, billingLastName, firstName, lastName, address, city, state, zip, email, errors } = this.state;
    const { cart, userId } = this.props;
    const { changePromo } = this;

    if(!cart.id) return null;

    const discountedPrice = (cart.total * this.state.discount).toFixed(2)

    return (
      <div id='style'>
        <h1 className='header'>Checkout</h1>
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
        <p><Link to='/cart'><button className='btn btn-primary btn-sm'>Edit Cart</button></Link></p>
        <p><strong>Total: </strong>{ '$' + cart.total }</p>
        
        <form onSubmit = { this.handleChange } >
        <p><strong> Have a Promo code? </strong></p> 
        <input onChange = { changePromo } ></input>
        <button type = 'submit' className='btn btn-primary btn-sm'> Apply Discount </button>
        </form>
        
        {
          this.state.discount !== 1 ?
            <p><strong>Total with discount:</strong> ${ discountedPrice } </p>
          :
          <p><strong>Thanks for shopping!</strong></p>
        }


        <form onSubmit={ event => this.handleSubmit(event, userId, cart.id, this.state) }>
          <h2 className='header'>Billing Information</h2>
          <div className='form-group'>
            <input name='billingFirstName' value={ billingFirstName } className='element' onChange={ this.handleChange } placeholder='Billing First Name' />
            <p className='error'>{ errors.billingFirstName }</p>
          </div>
          <div className='form-group'>
            <input name='billingLastName' value={ billingLastName } className='element' onChange={ this.handleChange } placeholder='Billing Last Name' />
            <p className='error'>{ errors.billingFirstName }</p>
          </div>
          <div className='form-group'>
            <CardElement className='CardElement element' onChange={ this.handlePaymentChange } />
            <p className='error'>{ errors.payment }</p>
          </div>
          <hr className='style-eight' />
          <h2 className='header'>Shipment Information</h2>
          <AddressDropdown addresses={ this.props.addresses } addressId={ this.state.addressId } handleDropdownChange={ this.handleDropdownChange } />
          <div className='form-group'>
            <input name='firstName' value={ firstName } className='element' onChange={ this.handleChange } placeholder='First Name' />
            <p className='error'>{ errors.firstName }</p>
          </div>
          <div className='form-group'>
            <input name='lastName' value={ lastName } className='element' onChange={ this.handleChange } placeholder='Last Name' />
            <p className='error'>{ errors.lastName }</p>
          </div>
          <div className='form-group'>
            <input name='email' value={ email } className='element' onChange={ this.handleChange } placeholder='Email' />
            <p className='error'>{ errors.email }</p>
          </div>
          <div className='form-group'>
            <input name='address' value={ address } className='element' onChange={ this.handleChange } placeholder='Address' />
            <p className='error'>{ errors.address }</p>
          </div>
          <div className='form-group'>
            <input name='city' value={ city } className='element' onChange={ this.handleChange } placeholder='City' />
            <p className='error'>{ errors.city }</p>
          </div>
          <div className='form-group'>
            <input name='state' value={ state } className='element' onChange={ this.handleChange } placeholder='State' />
            <p className='error'>{ errors.state }</p>
          </div>
          <div className='form-group'>
            <input name='zip' value={ zip } className='element' onChange={ this.handleChange } placeholder='Zip Code' />
            <p className='error'>{ errors.zip }</p>
          </div>
          <button className='btn btn-primary btn-sm'>Submit Order</button>
        </form>
      </div>
    );
  }
}


const mapState = state => ({
  cart: state.cart,
  userId: state.user.id,
  promoCodes: state.promoCodes,
  addresses: state.addresses
});

const mapDispatch = (dispatch, { history }) => ({
  checkoutCart(userId, orderId, orderInfo, update) {
    dispatch(checkout(userId, orderId, orderInfo, history));
    dispatch(updateOrder(userId, orderId, update, history));
  }
});

export default connect(mapState, mapDispatch)(injectStripe(Checkout));

const AddressDropdown = ({ addresses, addressId, handleDropdownChange }) => {
  return (
    <select value={ addressId } onChange={ handleDropdownChange }>
      <option value='0'>Ship to a Saved Address</option>
      { addresses.map(address => {
        return (
          <option key={ address.id } value={ address.id }>
            { `${address.name}; ${address.email}; ${address.address}; ${address.city}, ${address.state} ${address.zip}` }
          </option>
        )}
      )}
    </select>
  );
};
