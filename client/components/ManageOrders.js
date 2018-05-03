import React from 'react';
import { connect } from 'react-redux';

class ManageOrders extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { orders } = this.props;
    if(!orders || !orders.length) return <h2>You have no prior orders.</h2>
    return (
      <div>
        <h2>Manage Orders</h2>
        <div>
          {
            orders.map(order => (
              <div key={ order.id }>
                <h3>Order #{ order.id }</h3>
                <div className='row'>
                  <div className='col-2'>
                    <p><strong>Quantity</strong></p>
                  </div>
                  <div className='col-5'>
                    <p><strong>Product</strong></p>
                  </div>
                  <div className='col-5'>
                    <p><strong>Subtotal</strong></p>
                  </div>
                </div>
                { order.lineitems.map(item => (
                  <div className='row' key={ item.id } >
                    <div className='col-2'>
                      { item.quantity }
                    </div>
                    <div className='col-5'>
                      { item.product.name }
                    </div>
                    <div className='col-5'>
                      ${ item.subtotal }
                    </div>
                  </div>
                ))}
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const userId = state.user.id;
  const orders = state.orders.filter(order => order.userId === userId && order.status !== 'cart');
  return { orders };
};

export default connect(mapState)(ManageOrders);
