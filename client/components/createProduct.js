import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveProduct } from '../store/products';

class createProduct extends Component {
    constructor(product){
        super()
        this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
        this.state = {
            name: product.name ? product.name: 'placeholder',
            description: product.description ? product.description: 'placeholder',
            price: product.price ? product.price: 0,
            categoryId: product.categoryId ? product.categoryId: 1,
            imageUrl: product.imageUrl ? product.imageUrl: '/images/noImage.jpg'
          }
    }
    onSave(ev){
        console.log('hit?', this.state)
        
        ev.preventDefault()
        const product = this.state;
        saveProduct(product)
    }
    onChange(ev){
        this.setState({ [ev.target.name]: ev.target.value });
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
                        Price: <input name = 'price' onChange = { this.onChange }></input> 
                    </li>  
                    
                    <li> 
                        Description <input name = 'description' onChange = { this.onChange }></input> 
                    </li>  

                    <li> 
                        Image <input name = 'imageUrl' onChange = { this.onChange }></input> 
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
        updateProduct: (product) => dispatch(updateProduct(product, history)),
        saveProduct: (product) => dispatch(saveProduct(product)),
    }
  }

export default connect(mapState, mapDispatch)(createProduct);