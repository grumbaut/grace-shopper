import React from 'react';

const Product = ({ product }) => (
  <div>
    <h1>{ product.name }</h1>
    <p>{ product.description }</p>
    <p><strong>{ product.price }</strong></p>
  </div>
);

export default Product;
