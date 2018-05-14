import React from 'react';
import { connect } from 'react-redux';

import { putAddress } from '../store';

class EditAddress extends React.Component {
  constructor(props) {
    super(props);
    const { address } = this.props;
    this.state = {
      firstName: address ? address.firstName : '',
      lastName: address ? address.lastName : '',
      address: address ? address.address : '',
      city: address ? address.city : '',
      state: address ? address.state : '',
      zip: address ? address.zip : '',
      email: address ? address.email : '',
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

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
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
    this.props.putAddress(this.props.userId, this.state, this.props.id);
  }

  render() {
    const { userId } = this.props;
    const { firstName, lastName, address, city, state, zip, email, errors } = this.state;
    if(!userId) return <h1 className='header'>Sign in to view this page.</h1>;
    return (
      <div id='style'>
        <h1 className='header'>Edit Address</h1>
        <div>
          <form onSubmit={ this.handleSubmit }>
            <div className='form-group'>
              <input value={ firstName } name='firstName' onChange={ this.handleChange } className='element' />
              <p className='error'>{ errors.firstName }</p>
            </div>
            <div className='form-group'>
              <input value={ lastName } name='lastName' onChange={ this.handleChange } className='element' />
              <p className='error'>{ errors.lastName }</p>
            </div>
            <div className='form-group'>
              <input value={ address } name='address' onChange={ this.handleChange } className='element' />
              <p className='error'>{ errors.address }</p>
            </div>
            <div className='form-group'>
              <input value={ city } name='city' onChange={ this.handleChange } className='element' />
              <p className='error'>{ errors.city }</p>
            </div>
            <div className='form-group'>
              <input value={ state } name='state' onChange={ this.handleChange } className='element' />
              <p className='error'>{ errors.state }</p>
            </div>
            <div className='form-group'>
              <input value={ zip } name='zip' onChange={ this.handleChange } className='element' />
              <p className='error'>{ errors.zip }</p>
            </div>
            <div className='form-group'>
              <input value={ email } name='email' onChange={ this.handleChange } className='element' />
              <p className='error'>{ errors.email }</p>
            </div>
            <button className='btn btn-primary btn-sm'>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapState = (state, { match }) => ({
  id: match.params.id,
  address: state.addresses.find(address => address.id === Number(match.params.id)),
  userId: state.user.id
});

const mapDispatch = (dispatch, { history }) => ({
  putAddress(id, addressInfo, addressId) {
    dispatch(putAddress(id, addressInfo, addressId, history));
  }
});

export default connect(mapState, mapDispatch)(EditAddress);
