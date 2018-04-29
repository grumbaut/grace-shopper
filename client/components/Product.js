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
      name: product.name ? product.name: 'placeholder',
      description: product.description ? product.description: 'placeholder',
      price: product.price ? product.price: 0,
      categoryId: product.categoryId ? product.categoryId: 1,
      imageUrl: product.imageUrl ? product.imageUrl: '/images/noImage.jpg'
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.product) {
      this.setState({
        name: nextProps.product.name,
        description: nextProps.product.description,
        price: nextProps.product.price,
        categoryId: nextProps.product.categoryId,
        imageUrl: nextProps.product.imageUrl
      });
    }
  }
  onSave(ev){
    ev.preventDefault()
    const product = { productId: this.props.id, name: this.state.name, description: this.state.description, price: this.state.price, imageURL: this.state.imageURL, categoryId: this.state.categoryId }
    console.log(product, 'this is the Saved product')
    updateProduct(product)
  }
  onChange(ev){
    const change = {};
    change[ev.target.name] = ev.target.value;
    console.log(change, 'this is the change requested')
    this.setState(change);
  }
  render(){
    const { user, product, categories } = this.props
    const { onChange, onSave } = this
    const { price, name, imageUrl, description } = this.state

    if (!product) {
      return null;
    }
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
                  <li> Price <input name =  'price' onChange = { this.onChange } ></input> </li>
                  <li> Name <input onChange = { this.onChange } name = 'name'></input> </li>
                  <li> Category <input onChange = { this.onChange } name = 'categoryId'></input> </li>
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
  const product = products.find( product => product.id === id );
  return {
    product,
    categories,
    user
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
      updateProduct: (product) => dispatch(updateProduct(product, history))
  }
}

export default connect(mapState, mapDispatch)(Product);
