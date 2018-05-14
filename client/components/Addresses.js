import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAddresses, postAddress, deleteAddress } from '../store';

class Addresses extends React.Component {
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
    this.props.postAddress(this.props.userId, this.state);
    this.setState({ firstName: '', lastName: '', address: '', city: '', state: '', zip: '', email: '' });
  }

  componentDidMount() {
    this.props.getAddresses(this.props.userId);
  }

  render() {
    const { userId, addresses, deleteAddress } = this.props;
    if(!userId) return <h1 className='header'>Sign in to view this page.</h1>;
    return (
      <div id='style'>
        <h1 className='header'>Add New Address</h1>
        <AddressForm orderInfo={ this.state } handleChange={ this.handleChange } handleSubmit={ this.handleSubmit } errors={ this.state.errors } />
        { addresses && addresses.length ?
          <div>
            <hr className='style-eight' />
            <h1 className='header'>Manage Saved Addresses</h1>
            { addresses.map(address => {
              return (
                <div key={ address.id }>
                  <p><strong>{ address.name }</strong></p>
                  <p><strong>{ address.address }</strong></p>
                  <p><strong>{ `${address.city}, ${address.state} ${address.zip}` }</strong></p>
                  <p><strong>{ address.email }</strong></p>
                  <Link to={`/edit-address/${address.id}`}><button className='btn btn-primary btn-sm'>Edit Address</button></Link>
                  <button className='btn btn-danger btn-sm' onClick={ () => deleteAddress(userId, address.id) } >Delete Address</button>
                </div>
              );
            })
            }
          </div>
          :
          null
        }
      </div>
    );
  }
}

const mapState = state => ({
  addresses: state.addresses,
  userId: state.user.id
});

const mapDispatch = dispatch => ({
  getAddresses(id) {
    dispatch(getAddresses(id));
  },
  postAddress(id, addressInfo) {
    dispatch(postAddress(id, addressInfo));
  },
  deleteAddress(id, addressId) {
    dispatch(deleteAddress(id, addressId));
  }
});

export default connect(mapState, mapDispatch)(Addresses);

const AddressForm = ({ orderInfo, handleChange, handleSubmit, errors }) => {
  const { firstName, lastName, address, city, state, zip, email } = orderInfo;
  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <div className='form-group'>
          <input value={ firstName } name='firstName' onChange={ handleChange } className='element' placeholder='First Name' />
          <p className='error'>{ errors.firstName }</p>
        </div>
        <div className='form-group'>
          <input value={ lastName } name='lastName' onChange={ handleChange } className='element' placeholder='Last Name' />
          <p className='error'>{ errors.lastName }</p>
        </div>
        <div className='form-group'>
          <input value={ address } name='address' onChange={ handleChange } className='element' placeholder='Address' />
          <p className='error'>{ errors.address }</p>
        </div>
        <div className='form-group'>
          <input value={ city } name='city' onChange={ handleChange } className='element' placeholder='City' />
          <p className='error'>{ errors.city }</p>
        </div>
        <div className='form-group'>
          <input value={ state } name='state' onChange={ handleChange } className='element' placeholder='State' />
          <p className='error'>{ errors.state }</p>
        </div>
        <div className='form-group'>
          <input value={ zip } name='zip' onChange={ handleChange } className='element' placeholder='Zip Code' />
          <p className='error'>{ errors.zip }</p>
        </div>
        <div className='form-group'>
          <input value={ email } name='email' onChange={ handleChange } className='element' placeholder='Email' />
          <p className='error'>{ errors.email }</p>
        </div>
        <button className='btn btn-primary btn-sm'>Submit</button>
      </form>
    </div>
  );
};
