import React from 'react';
import { connect } from 'react-redux';
import { updateOrder } from '../store';

class EditOrder extends React.Component {
  constructor(props) {
    super(props);
    const order = this.props.order;
    this.state = {
      name: order ? order.name : '',
      email: order ? order.email : '',
      address: order ? order.address : '',
      city: order ? order.city : '',
      state: order ? order.state : '',
      zip: order ? order.zip : ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(!this.state.name) {
      const { name, email, address, city, state, zip } = nextProps.order;
      this.setState({ name, email, address, city, state, zip });
    }
  }

  handleSubmit(event, userId, orderId, shippingInfo) {
    event.preventDefault();
    this.props.updateOrder(userId, orderId, shippingInfo);
  }

  handleChange(event) {
    this.setState({ [ event.target.name ]: event.target.value });
  }

  render() {
    const { order } = this.props;
    const { name, address, city, state, zip, email } = this.state;
    if(!order) return null;
    return (
      <div>
        <h2>Edit Shipping Info for Order#{ order.id }</h2>
        <form onSubmit={ event => this.handleSubmit(event, order.userId, order.id, this.state) }>
          <div className='form-group'>
            <label htmlFor='name'>Name: </label>
            <input name='name' value={ name } onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='address'>Address: </label>
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
            <label htmlFor='zip'>Zip: </label>
            <input name='zip' value={ zip } onChange={ this.handleChange } />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email: </label>
            <input name='email' value={ email } onChange={ this.handleChange } />
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
