import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { updateProduct } from '../store/product';

class Product extends React.Component {
  constructor(product){
    super()

    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
    
    this.state = {
      name: product.name ? product.name: '',
      description: product.description ? product.description: '',
      price: product.price ? product.price: 0,
      categoryId: product.categoryId ? product.categoryId: ''
    }
  }
  onSave(ev){
    ev.preventDefault()
    const product = { productId: this.props.id, name: this.state.name, description: this.state.description, price: this.state.price, imageURL: this.props.product.imageURL, categoryId: this.state.categoryId }
    updateProduct(product)
  }
  onChange(ev){
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  render(){
    const { user, products, categories, id } = this.props
    const { onChange, onSave } = this
    const product = products.find( product => product.id === id );
    const productCategory = categories.find(category => category.id === product.categoryId);
    return (
      <div>
        {/*<ProductCard product={product} />*/}
          <h1>{ product.name }</h1>
          <img src = { product.imageUrl } width={400} />
          <h2>{`$${product.price}`}</h2>
          <p>{ product.description }</p>   
        <p>{ product.name } is in our <Link to={`/categories/${productCategory.id}`}>{productCategory.name}</Link> category</p>       
        <ul>
            {
              user.isAdmin === true ?  
              <ul>
              <form onSubmit= { onSave }>
              <h3>Admin: you may update this product </h3>
                  <li> Price <input onChange = { this.onChange } name = 'price'></input> </li>
                  <button type='submit'> Update </button>
              </form>
              </ul>    
              : <button> Add to cart</button>
            }
        </ul>
      </div>
      )
    }  
}

const mapState = ({ products, categories, user }, { id })=> {
  return {
    products,
    categories,
    user
  };
};

const mapDispatch = (dispatch) => {
  return {
      updateProduct: (product) => dispatch(updateProduct(product))
  }
}

export default connect(mapState, mapDispatch)(Product);


// <li> Stock <input onChange = { this.onChange } name = 'quantity'></input> </li>
// <li> Category <input onChange = { this.onChange } name = 'categoryId'></input> </li>