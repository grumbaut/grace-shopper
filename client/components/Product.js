import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Review from './Review';

const Product = ({ product, categories, reviews, id }) => {
  if (!product) {
    return null;
  }
  const categoryOfThisProduct = categories.find( category => category.id === product.categoryId);
  return (
    <div>
      <div>
        <h1>{ product.name }</h1>
        <img src = {product.imageUrl} width={400} />
        <h2>{`$${product.price}`}</h2>
        <p>{ product.description }</p>
      </div>
      { product.categoryId ? <p>{product.name} is in our <Link to={`/categories/${categoryOfThisProduct.id}`}>{categoryOfThisProduct.name}</Link> category</p> : null }
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
