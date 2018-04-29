import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const Product = ({ user, product, categories, id }) => {
  if (!product) {
    return null;
  }
  // componentWillReceiveProps(){

  // }
  const categoryOfThisProduct = categories.find(category=> category.id === product.categoryId);
  return (
    <div>
      {/*<ProductCard product={product} />*/}
      <div>
        <h1>{ product.name }</h1>
        <img src = { product.imageUrl } width={400} />
        <h2>{`$${product.price}`}</h2>
        <p>{ product.description }</p>          
      </div>
      <p>{ product.name } is in our <Link to={`/categories/${categoryOfThisProduct.id}`}>{categoryOfThisProduct.name}</Link> category</p>
      <ul>

      </ul>
    </div>
  )
}

const mapState = ({ products, categories, user }, { id })=> {
  const product = products.find( product => product.id === id );
  // const categoryOfThisProduct = categories.find(category=> category.id === product.categoryId);
  return {
    product,
    categories,
    // categoryOfThisProduct,
    user
  };
};

export default connect(mapState)(Product);
