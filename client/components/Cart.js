import React from 'react';
import { connect } from 'react-redux';
import { updateCart, deleteItem, updateQuantity } from '../store';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, lineItem) {
    const { id } = lineItem;
    const { value } = event.target;
    const currentItem = this.props.lineItems.find(item => item.id === Number(id));
    const updatedItem = Object.assign(currentItem, { quantity: value, subtotal: (value * lineItem.product.price).toFixed(2) });
    const lineItems = this.props.lineItems.filter(item => item.id === Number(id) ? updatedItem : item);
    this.props.updateQuantity(lineItems);
    const { userId, cart } = this.props;
    this.handleSubmit(userId, cart.id);
  }

  handleSubmit(userId, cartId) {
    this.props.updateCart(userId, cartId, this.props.lineItems);
  }

  render() {
    const { lineItems, deleteItem } = this.props;
    if(!lineItems || !lineItems.length) return <h1>Your cart is empty.</h1>;
    const quantityNum = [];
    const total = lineItems.reduce((acc, item) => acc + Number(item.subtotal), 0).toFixed(2);
    for(let i = 1; i <= 50; i++) {
      quantityNum.push(i);
    }
    return (
      <div>
        <h1>Cart</h1>
        { lineItems.map(lineItem => (
          <div className='row' key={ lineItem.id }>
            <div className='col-2'>
              <select value={ lineItem.quantity } onChange={ event => this.handleChange(event, lineItem) }>
                { quantityNum.map(num => (
                  <option key={ num } value={ num }>{ num }</option>
                ))}
              </select>
            </div>
            <div className='col-5'>
              { lineItem.product.name }
            </div>
            <div className='col-3'>
              <p>Subtotal: { lineItem.subtotal }</p>
            </div>
            <div className='col-2'>
              <button className='btn btn-danger btn-sm' onClick={ () => deleteItem(lineItem.id)}>X</button>
            </div>
          </div>
        ))}
        <p><strong>Total:</strong> { total }</p>
        <button className='btn btn-primary btn-sm'>Checkout</button>
      </div>
    );
  }
}

const mapState = state => ({
  cart: state.cart,
  userId: state.user.id,
  lineItems: state.cart.lineitems
});

const mapDispatch = dispatch => ({
  updateQuantity(lineItems) {
    dispatch(updateQuantity(lineItems));
  },
  updateCart(userId, orderId, lineItemId, quantity) {
    dispatch(updateCart(userId, orderId, lineItemId, quantity));
  },
  deleteItem(lineItem, userId, orderId) {
    dispatch(deleteItem(lineItem, userId, orderId));
  }
});

export default connect(mapState, mapDispatch)(Cart);
