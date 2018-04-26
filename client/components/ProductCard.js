import React from 'react';

const ProductCard = ({ product }) => {
  if(!product) return null;
  return (
    <div>
      <h1>{ product.name }</h1>
      <img src = {product.imageUrl} />
      <h2>{`$${product.price}`}</h2>
      <p>{ product.description }</p>
    </div>
  );
};

export default ProductCard;
