import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Categories = ({categories, products})=> {
  if (categories.length > 0) {
    return (
      <div>
        <h1>All Categories</h1>
        <p>Number of Categories: {categories.length}</p>
        <ul>
          {
            categories.map(category => {
              return (
                <div key={category.id}>
                  <Link to={`categories/${category.id}`}>{category.name}</Link>
                  <p>Number of products: {products.filter( product => product.categoryId === category.id).length}</p>
                </div>
              )
            })
          }
        </ul>
      </div>
    )
  }
  else {
    return (
      <div>
        <p>There are no categories at present</p>
      </div>
    )
  }
}

const mapStateToProps = ({ categories, products })=> {
  return {
    categories,
    products
  }
};

export default connect(mapStateToProps)(Categories);
