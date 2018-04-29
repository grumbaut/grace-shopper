import React, { Component } from 'react';
import { connect } from 'react-redux';

class createProduct extends Component {
    constructor(product){
        super()
        this.state = {
            name: product.name ? product.name: 'placeholder',
            description: product.description ? product.description: 'placeholder',
            price: product.price ? product.price: 0,
            categoryId: product.categoryId ? product.categoryId: 1,
            imageUrl: product.imageUrl ? product.imageUrl: '/images/noImage.jpg'
          }
    }
    render(){
        return (
            <h1> heloo! </h1>
        )
    }
}

const mapDispatch = (dispatch, { history }) => {
    return {
        createProduct: (product) => dispatch(createProduct(product, history))
    }
  }

export default connect(null, mapDispatch)(createProduct);