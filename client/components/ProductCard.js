import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  if(!product) return null;
  return (
    <div>
      <h1>{ product.name }</h1>
      <img src = {product.imageUrl} width={200} />
      <h2>{`$${product.price}`}</h2>
      <p>{ product.description }</p>
      <Link to={`/products/${product.id}`}><i>details</i></Link>      
    </div>
  );
};

export default ProductCard;
