import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const OrderConfirmation = ({ user, order }) => {
  if(!user || !order ) return null;
  return (
    <div id='style'>
      <h1 className='header'>Your order is on the way!</h1>
      <p>Thank you for shopping Williams-Pomona. Your order is on the way!</p>
      <p>Here&#8217;s a quick recap of what you&#8217;re getting:</p>
      <div className='row'>
        <div className='col-2'><strong>Quantity</strong></div>
        <div className='col-6'><strong>Name</strong></div>
        <div className='col-4'><strong>Subtotal</strong></div>
      </div>
      { order.lineitems.map(item => (
        <div className='row' key={ item.id } >
          <div className='col-2'>{ item.quantity }</div>
          <div className='col-6'>{ item.product.name }</div>
          <div className='col-4'>{ '$' + item.subtotal.toFixed(2) }</div>
        </div>
      ))}
      <p><strong>Total: </strong>{ '$' + order.total }</p>
      <Link to='/'><button className='btn btn-primary btn-sm'>Continue Shopping</button></Link>
    </div>
  );
};

const mapState = (state, { match }) => ({
  user: state.user,
  order: state.orders.find(order => order.id === Number(match.params.id))
});

export default connect(mapState)(OrderConfirmation);
