import React from 'react';

const OrderInfo = ({ orders }) => {
  return (
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
            <p><strong>Total: ${ order.total }</strong></p>
          </div>
        ))
      }
    </div>
  );
};

export default OrderInfo;
