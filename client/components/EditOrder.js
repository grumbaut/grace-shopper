import React from 'react';
import { connect } from 'react-redux';
import { updateOrder } from '../store';

class EditOrder extends React.Component {
  constructor(props) {
    super(props);
    const order = this.props.order;
    this.state = {
      firstName: order ? order.firstName : '',
      lastName: order ? order.lastName : '',
      email: order ? order.email : '',
      address: order ? order.address : '',
      city: order ? order.city : '',
      state: order ? order.state : '',
      zip: order ? order.zip : '',
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

  componentWillReceiveProps(nextProps) {
    if(!this.state.name) {
      const { firstName, lastName, email, address, city, state, zip } = nextProps.order;
      this.setState({ firstName, lastName, email, address, city, state, zip });
    }
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
    this.props.updateOrder(userId, orderId, shippingInfo);
  }

  handleChange(event) {
    this.setState({ [ event.target.name ]: event.target.value });
  }

  render() {
    const { order } = this.props;
    const { firstName, lastName, address, city, state, zip, email, errors } = this.state;
    if(!order) return null;
    return (
      <div>
        <h2>Edit Shipping Info for Order#{ order.id }</h2>
        <form onSubmit={ event => this.handleSubmit(event, order.userId, order.id, this.state) }>
          <div className='form-group'>
            <label htmlFor='firstName'>First Name: </label>
            <input name='firstName' value={ firstName } onChange={ this.handleChange } />
            <p className='error'>{ errors.firstName }</p>
          </div>
          <div className='form-group'>
            <label htmlFor='lastName'>Last Name: </label>
            <input name='lastName' value={ lastName } onChange={ this.handleChange } />
            <p className='error'>{ errors.lastName }</p>
          </div>
          <div className='form-group'>
            <label htmlFor='address'>Address: </label>
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
            <label htmlFor='zip'>Zip: </label>
            <input name='zip' value={ zip } onChange={ this.handleChange } />
            <p className='error'>{ errors.zip }</p>
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email: </label>
            <input name='email' value={ email } onChange={ this.handleChange } />
            <p className='error'>{ errors.email }</p>
          </div>
          <button className='btn btn-primary btn-sm'>Update</button>
        </form>
      </div>
    );
  }
}

const mapState = (state, { match }) => ({
  order: state.orders.find(order => order.id === Number(match.params.id))
});

const mapDispatch = (dispatch, { history }) => ({
  updateOrder(userId, orderId, updatedShippingInfo) {
    dispatch(updateOrder(userId, orderId, updatedShippingInfo, history));
  }
});

export default connect(mapState, mapDispatch)(EditOrder);
