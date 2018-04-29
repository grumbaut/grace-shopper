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
            <div>
            <ul>
            <h3> Create New Product </h3>
                <form onSubmit ={ this.onSave }>
                    <li> 
                        Name <input name = 'name' onChange = { this.onChange }></input> 
                    </li>        
                    
                    <li> 
                        Price: <input name = 'price' onChange = { this.onChangeLast }></input> 
                    </li>  
                    
                    <li> 
                        Image <input name = 'imageUrl' onChange = { this.onChangeImage }></input> 
                    </li>  
    
                    <li> 
                         Category:    
                         <select onChange = { this.onChange }>
                         <option> None </option>
                            {
                                this.props.categories.map (category => <option key={ category.id } value={ category.name }> { category.name } </option>)
                            }
                         </select>
                     </li> 
                    <button type='submit' className="btn btn-primary btn-sm"> Create </button>
                </form>
            </ul>
            </div>
        )
    }
}

const mapState = ({ categories, products })=> {
    return {
      categories,
      products
    }
};

const mapDispatch = (dispatch, { history }) => {
    return {
        updateProduct: (product) => dispatch(updateProduct(product, history))
    }
  }

export default connect(mapState, mapDispatch)(createProduct);