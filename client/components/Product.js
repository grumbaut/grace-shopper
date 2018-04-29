import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const Product = ({ user, product, categories, id }) => {
  if (!product) {
    return null;
  }
  const categoryOfThisProduct = categories.find(category=> category.id === product.categoryId);
  return (
    <div>
      {/*<ProductCard product={product} />*/}
        <h1>{ product.name }</h1>
        <img src = { product.imageUrl } width={400} />
        <h2>{`$${product.price}`}</h2>
        <p>{ product.description }</p>          
      <p>{ product.name } is in our <Link to={`/categories/${categoryOfThisProduct.id}`}>{categoryOfThisProduct.name}</Link> category</p>
      <ul>
          {
            user.isAdmin === true ?  <button>Edit</button> : <button>Add to cart</button>
          }
      </ul>
    </div>
  )
}

const mapState = ({ products, categories, user }, { id })=> {
  const product = products.find( product => product.id === id );
  return {
    product,
    categories,
    user
  };
};

export default connect(mapState)(Product);
