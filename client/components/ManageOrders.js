import React from 'react';
import { connect } from 'react-redux';
import OrderInfo from './OrderInfo';

class ManageOrders extends React.Component {
  constructor(props) {
    super(props);
  }

  checkIfOrders(orders) {
    for(let key in orders) {
      if(orders[key].length) {
        return false;
      }
    }
    return true;
  }

  render() {
    const { orders } = this.props;
    if(this.checkIfOrders(orders)) return <h2>You have not placed any orders.</h2>;
    const { pastOrders, shippedOrders, inProcess, cancelled } = orders;
    return (
      <div>
        <h2>Manage Orders</h2>
        {
          inProcess && inProcess.length ?
            <div>
              <h3>Not Yet Shipped</h3>
              {
                inProcess.map(order => <OrderInfo order={ order } key={ order.id } />)
              }
            </div>
            :
            null
        }
        {
          shippedOrders && shippedOrders.length ?
            <div>
              <h3>On Its Way</h3>
              {
                shippedOrders.map(order => <OrderInfo order={ order } key={ order.id } />)
              }
            </div>
            :
            null
        }
        {
          pastOrders && pastOrders.length ?
            <div>
              <h3>Past Orders</h3>
              {
                pastOrders.map(order => <OrderInfo order={ order } key={ order.id } />)
              }
            </div>
            :
            null
        }
        {
          cancelled && cancelled.length ?
            <div>
              <h3>Cancelled Orders</h3>
              {
                cancelled.map(order => <OrderInfo order={ order } key={ order.id } />)
              }
            </div>
            :
            null
        }
      </div>
    );
  }
}

const mapState = state => {
  const userId = state.user.id;
  const pastOrders = state.orders.filter(order => order.userId === userId && order.status === 'delivered');
  const shippedOrders = state.orders.filter(order => order.userId === userId && order.status === 'shipped');
  const inProcess = state.orders.filter(order => order.userId === userId && order.status === 'processing');
  const cancelled = state.orders.filter(order => order.userId === userId && order.status === 'cancelled');
  return { orders: { pastOrders, shippedOrders, inProcess, cancelled } };
};

export default connect(mapState)(ManageOrders);
