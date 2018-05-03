import React from 'react';
import { Link } from 'react-router-dom';

const OrderInfo = ({ orders }) => {
  return (
    <div>
      {
        orders.map(order => (
          <div key={ order.id }>
            <h3>Order #{ order.id }</h3>
            {
              order.status === 'processing' ?
                <div>
                  <Link to={ `/edit-order/${order.id}`}><button className='btn btn-primary btn-sm'>Edit Shipping Info</button></Link>
                  <button className='btn btn-danger btm-sm'>Cancel Order</button>
                </div>
                :
                null
            }
            <div>
              <p><strong>Delivery Address:</strong></p>
              <p>{ order.name }</p>
              <p>{ order.address }</p>
              <p>{ order.city }, { order.state } { order.zip }</p>
              <p>{ order.email }</p>
            </div>
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
