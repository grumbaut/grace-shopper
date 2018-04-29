import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { updateProduct } from '../store/product';

class Product extends React.Component {
  constructor(props){
    super(props)

    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    
    this.state = {
      name: this.props.product ? this.props.product.name : '',
      description: this.props.product ? this.props.product.description : '',
      price: this.props.product ? this.props.product.price : 0,
      categoryId: this.props.product ? this.props.product.categoryId : ''
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.product) {
      this.setState({
        name: nextProps.product.name,
        description: nextProps.product.description,
        price: nextProps.product.price,
        categoryId: nextProps.product.categoryId
      });
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
    const { user, categories, product } = this.props;
    // const { product } = this.state;
    const { onChange, onSave } = this;    

    if (!product) {
      return null;
    }
    console.log('product is', product);
    const productCategory = categories.find(category => category.id === product.categoryId);
    console.log('productCategory is', productCategory);

    return (      
      <div>
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
  const product = products.find( product => product.id === id );
  console.log('product in mapState', product);
  console.log('products in mapState are: ', products);
  return {
    products,
    categories,
    user,
    product
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