import React from 'react';
import { connect } from 'react-redux';
import { updateCart } from '../store';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    const { cart } = this.props;
    this.state = {
      lineItems: cart && cart.lineitems ? cart.lineitems : []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(!this.state.lineItems || !this.state.lineItems.length) {
      this.setState({ lineItems: nextProps.cart.lineitems });
    }
  }

  handleChange(event, lineItem) {
    const { id } = lineItem;
    const { value } = event.target;
    const currentItem = this.state.lineItems.find(item => item.id === Number(id));
    const updatedItem = Object.assign(currentItem, { quantity: value, subtotal: (value * lineItem.product.price).toFixed(2) });
    const updatedState = this.state.lineItems.filter(item => item.id === Number(id) ? updatedItem : item);
    this.setState({ lineItems: updatedState});
  }

  handleSubmit(event, userId, cartId) {
    event.preventDefault();
    this.props.updateCart(userId, cartId, this.state.lineItems);
  }

  render() {
    const { userId, cart } = this.props;
    if(!this.state.lineItems || !this.state.lineItems.length) return null;
    const { lineItems } = this.state;
    const quantityNum = [];
    const total = this.state.lineItems.reduce((acc, item) => acc + Number(item.subtotal), 0).toFixed(2);
    for(let i = 1; i <= 50; i++) {
      quantityNum.push(i);
    }
    return (
      <div>
        <h1>Cart</h1>
        <form onSubmit={ event => this.handleSubmit(event, userId, cart.id)}>
          { lineItems.map(lineItem => (
            <div className='row' key={ lineItem.id }>
              <div className='col-2'>
                <select value={ lineItem.quantity } onChange={ event => this.handleChange(event, lineItem) }>
                  { quantityNum.map(num => (
                    <option key={ num } value={ num }>{ num }</option>
                  ))}
                </select>
              </div>
              <div className='col-6'>
                { lineItem.product.name }
              </div>
              <div className='col-4'>
                <p>Subtotal: { lineItem.subtotal }</p>
              </div>
            </div>
          ))}
          <p><strong>Total:</strong> { total }</p>
          <button className='btn btn-primary btn-sm'>Update Cart</button>
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  cart: state.cart,
  userId: state.user.id
});

const mapDispatch = dispatch => ({
  updateCart(userId, orderId, lineItemId, quantity) {
    dispatch(updateCart(userId, orderId, lineItemId, quantity));
  }
});

export default connect(mapState, mapDispatch)(Cart);
