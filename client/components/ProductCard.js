import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, user }) => {
  if(!product) return null;
  return (
    <div>
      <h1>{ product.name }</h1>
      <img src = {product.imageUrl} width={200} />
      <h2>{`$${product.price}`}</h2>
      <p>{ product.description }</p>
      {
        user.isAdmin === true ? 
          <Link to={`/products/${product.id}`}><i>Update Product</i></Link>
          :
          <Link to={`/products/${product.id}`}><i>Product Details</i></Link>  
      }     
    </div>
  );
};

export default ProductCard;
