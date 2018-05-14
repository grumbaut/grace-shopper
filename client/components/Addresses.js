import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAddresses, postAddress } from '../store';

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
      email: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.postAddress(this.props.userId, this.state);
  }

  componentDidMount() {
    this.props.getAddresses(this.props.userId);
  }

  render() {
    const { userId, addresses } = this.props;
    if(!userId) return <h1 className='header'>Sign in to view this page.</h1>;
    return (
      <div id='style'>
        <h1 className='header'>Add New Address</h1>
        <AddressForm orderInfo={ this.state } handleChange={ this.handleChange } handleSubmit={ this.handleSubmit } />
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
                  <button className='btn btn-danger btn-sm'>Delete Address</button>
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
  postAddress(id, addressInfo, addressId) {
    dispatch(postAddress(id, addressInfo, addressId));
  }
});

export default connect(mapState, mapDispatch)(Addresses);

const AddressForm = ({ orderInfo, handleChange, handleSubmit }) => {
  const { firstName, lastName, address, city, state, zip, email } = orderInfo;
  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <div className='form-group'>
          <input value={ firstName } name='firstName' onChange={ handleChange } className='element' placeholder='First Name' />
        </div>
        <div className='form-group'>
          <input value={ lastName } name='lastName' onChange={ handleChange } className='element' placeholder='Last Name' />
        </div>
        <div className='form-group'>
          <input value={ address } name='address' onChange={ handleChange } className='element' placeholder='Address' />
        </div>
        <div className='form-group'>
          <input value={ city } name='city' onChange={ handleChange } className='element' placeholder='City' />
        </div>
        <div className='form-group'>
          <input value={ state } name='state' onChange={ handleChange } className='element' placeholder='State' />
        </div>
        <div className='form-group'>
          <input value={ zip } name='zip' onChange={ handleChange } className='element' placeholder='Zip Code' />
        </div>
        <div className='form-group'>
          <input value={ email } name='email' onChange={ handleChange } className='element' placeholder='Email' />
        </div>
        <button className='btn btn-primary btn-sm'>Submit</button>
      </form>
    </div>
  );
};
