import React from 'react';
import { connect } from 'react-redux';
import OrderInfo from './OrderInfo';

class ManageOrders extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { pastOrders, shippedOrders, inProcess, cancelled } = this.props;
    if(!inProcess.length || !shippedOrders.length || !pastOrders.length || !cancelled.length ) return <h2>You have not placed any orders.</h2>;
    return (
      <div>
        <h2>Manage Orders</h2>
        {
          inProcess && inProcess.length ?
            <div>
              <h3>Not Yet Shipped</h3>
              <OrderInfo orders={ inProcess } />
            </div>
            :
            null
        }
        {
          shippedOrders && shippedOrders.length ?
            <div>
              <h3>On Its Way</h3>
              <OrderInfo orders={ shippedOrders } />
            </div>
            :
            null
        }
        {
          pastOrders && pastOrders.length ?
            <div>
              <h3>Past Orders</h3>
              <OrderInfo orders={ pastOrders } />
            </div>
            :
            null
        }
        {
          cancelled && cancelled.length ?
            <div>
              <h3>Cancelled Orders</h3>
              <OrderInfo orders={ cancelled } />
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
  return { pastOrders, shippedOrders, inProcess, cancelled };
};

export default connect(mapState)(ManageOrders);
