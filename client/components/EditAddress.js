import React from 'react';
import { connect } from 'react-redux';

import { putAddress } from '../store';

class EditAddress extends React.Component {
  constructor(props) {
    super(props);
    const { address } = this.props;
    console.log(address)
    this.state = {
      firstName: address ? address.firstName : '',
      lastName: address ? address.lastName : '',
      address: address ? address.address : '',
      city: address ? address.city : '',
      state: address ? address.state : '',
      zip: address ? address.zip : '',
      email: address ? address.email : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.putAddress(this.props.userId, this.state, this.props.id);
  }

  render() {
    const { userId } = this.props;
    const { firstName, lastName, address, city, state, zip, email } = this.state;
    if(!userId) return <h1 className='header'>Sign in to view this page.</h1>;
    return (
      <div id='style'>
        <h1 className='header'>Edit Address</h1>
        <div>
          <form onSubmit={ this.handleSubmit }>
            <div className='form-group'>
              <input value={ firstName } name='firstName' onChange={ this.handleChange } className='element' />
            </div>
            <div className='form-group'>
              <input value={ lastName } name='lastName' onChange={ this.handleChange } className='element' />
            </div>
            <div className='form-group'>
              <input value={ address } name='address' onChange={ this.handleChange } className='element' />
            </div>
            <div className='form-group'>
              <input value={ city } name='city' onChange={ this.handleChange } className='element' />
            </div>
            <div className='form-group'>
              <input value={ state } name='state' onChange={ this.handleChange } className='element' />
            </div>
            <div className='form-group'>
              <input value={ zip } name='zip' onChange={ this.handleChange } className='element' />
            </div>
            <div className='form-group'>
              <input value={ email } name='email' onChange={ this.handleChange } className='element' />
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
