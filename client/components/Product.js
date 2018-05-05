import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Review from './Review';

const Product = ({ product, reviews, id }) => {
  if (!product) {
    return null;
  }
  return (
    <div>
      <div id='product'>
        <h1 className='header product-name'>{ product.name }</h1>
        <img src = {product.imageUrl} width={400} />
        <h2>{`$${product.price}`}</h2>
        <h2>{ product.description }</h2>
      </div>
      <h4>Reviews:</h4>
      {
        reviews.map(review =>  {
          if (review.productId === id) return <Review review={review} key={review.id} />;
        })
      }
    </div>
  )
}

const mapStateToProps = ({ products, categories, reviews }, { match })=> {
  const id = match.params.id * 1;
  const product = products.find( product => product.id === id );
  return {
    product,
    categories,
    reviews,
    id
  };
};

export default connect(mapStateToProps)(Product);
