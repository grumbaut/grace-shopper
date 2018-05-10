import React from 'react';
import { connect } from 'react-redux';
import OrderInfo from './OrderInfo';

class AdminOrderStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      changed: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.search = this.search.bind(this);
  }

  handleChange(event) {
    this.setState({ search: event.target.value});
    this.setState({ change: true });
  }

  search(id) {
    return this.props.orders.find(order => order.id === Number(id) && order.status !== 'cart');
  }

  changeStatus(userId, orderId, event) {
    this.props.changeOrderStatus(userId, orderId, { status: event.target.value });
  }

  render(){
    const { user } = this.props;
    if(!user || !user.isAdmin) return <h1>You are not authorized to access this page.</h1>;
    const { search, changed } = this.state;
    const order = this.search(search);
    if(!user || !user.isAdmin) return <h1>You are not authorized to access this page.</h1>;
    return (
      <div>
        <h2 className='header'>Change Order Status</h2>
        <input value={ this.state.search } placeholder='Search by order ID...' onChange={ this.handleChange } />
        <div>
          { !order && changed ?
            <h2>No orders found.</h2>
            :
            null
          }
          {
            order ?
              <div>
                <OrderInfo order={ order } admin={ true } />
              </div>
              :
              null
          }
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  orders: state.orders,
  user: state.user
});

export default connect(mapState)(AdminOrderStatus);
