import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const Product = ({ product, categories }) => {
  if (!product) {
    return null;
  }
  const categoryOfThisProduct = categories.find(category=> category.id === product.categoryId);
  return (
    <div>
      <div>
        <h1>{ product.name }</h1>
        <img src = {product.imageUrl} width={400} />
        <h2>{`$${product.price}`}</h2>
        <p>{ product.description }</p>          
      </div>
      <p>{product.name} is in our <Link to={`/categories/${categoryOfThisProduct.id}`}>{categoryOfThisProduct.name}</Link> category</p>
    </div>
  );
};

const mapStateToProps = ({ products, categories }, { id }) => {
  const product = products.find( product => product.id === id );
  return {
    product,
    categories
    // categoryOfThisProduct
  };
};

export default connect(mapStateToProps)(Product);
