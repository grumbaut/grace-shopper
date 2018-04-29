import React, { Component } from 'react';

class createProduct extends Component {
    constructor(){
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
            <hr/>
        )
    }
}

export default createProduct;