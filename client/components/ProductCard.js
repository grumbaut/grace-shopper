import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addToCart } from '../store';

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ quantity: event.target.value });
  }

  render() {
    const { product, user, cart, addToCart } = this.props;
    const quantity = [];
    for(let i = 1; i < 50; i++) {
      quantity.push(i);
    }
    if(!product) return null;
    return (
      <div>
        <h1>{ product.name }</h1>
        <img src = {product.imageUrl} width={200} />
        <h2>{`$${product.price}`}</h2>
        <p>{ product.description }</p>
        <Link to={`/products/${product.id}`}><button className='btn btn-primary btn-sm'>Details</button></Link>
        { !user && !user.id ? null :
          <form onSubmit={ event => addToCart(event, user.id, cart.id, this.state.quantity, product)}>
            <select value={ this.state.quantity } onChange={ this.handleChange }>
              { quantity.map(num => <option key={ num } value={ num }>{ num }</option>)}
            </select>
            <button className='btn btn-primary btn-sm'>Add to Cart</button>
          </form>
        }
      </div>
    );
  }
}

const mapState = state => ({
  user: state.user,
  cart: state.cart
});

const mapDispatch = (dispatch, { history }) => ({
  addToCart(event, userId, orderId, quantity, product) {
    event.preventDefault();
    dispatch(addToCart(userId, orderId, quantity, product, history));
  }
});

export default connect(mapState, mapDispatch)(ProductCard);
