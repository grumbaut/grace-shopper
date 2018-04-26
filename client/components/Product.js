import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const Product = ({ product, categoryOfThisProduct, id }) => {
  if (!product) {
    return null;
  }
  return (
    <div>
      {/*<ProductCard product={product} />*/}
      <div>
        <h1>{ product.name }</h1>
        <img src = {product.imageUrl} width={400} />
        <h2>{`$${product.price}`}</h2>
        <p>{ product.description }</p>          
      </div>
      <p>{product.name} is in our <Link to={`/categories/${categoryOfThisProduct.id}`}>{categoryOfThisProduct.name}</Link> category</p>
    </div>
  )
}

const mapStateToProps = ({ products, categories }, { id })=> {
  const product = products.find( product => product.id === id );
  const categoryOfThisProduct = categories.find(category=> category.id === product.categoryId);
  return {
    product,
    categoryOfThisProduct
  };
};

export default connect(mapStateToProps)(Product);
