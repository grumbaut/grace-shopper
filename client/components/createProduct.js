import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveProduct } from '../store/products';

class CreateProduct extends Component {
  constructor(product){
    super();
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.previewFile = this.previewFile.bind(this);
    this.state = {
      name: product.name ? product.name : 'placeholder',
      description: product.description ? product.description : 'placeholder',
      price: product.price ? product.price : 0,
      categoryId: product.categoryId ? product.categoryId : 1,
      imageUrl: product.imageUrl ? product.imageUrl : '/images/noImage.jpg'
    };
  }

  previewFile(){
    const preview = document.querySelector('img');
    const file = preview? document.querySelector('input[type=file]').files[0]: null;
    const reader = new FileReader();

    reader.addEventListener("load", function () {
    preview.src = reader.result;
    }, false);

    if (file) {
    reader.readAsDataURL(file);
    }
  }


  onSave(ev){
    ev.preventDefault();
    const product = this.state;
    this.props.saveProduct(product);
  }

  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }

  render(){
    const { user } = this.props;
    if(!user || !user.isAdmin) return <h1>You are not authorized to access this page.</h1>;
    return (
      <div>
        <ul>
          <h3> Create New Product </h3>
          <form onSubmit ={ this.onSave }>
            <div className='form-group'>
              <label htmlFor='name'>Name: </label>
              <input name = 'name' onChange = { this.onChange } />
            </div>
            <div className='form-group'>
              <label htmlFor='price'>Price: </label>
              <input name = 'price' onChange = { this.onChange } />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Description: </label>
              <input name = 'description' onChange = { this.onChange } />
            </div>
            <div className='form-group'>
              <label htmlFor='imageUrl'>Image URL: </label>
              <input name = 'imageUrl' onChange = { this.onChange } />
            </div>
            <div>
              <label htmlFor='imageUrl'>Image URL: </label>
              <input type="file" onChange={ this.previewFile } />
              <img src="" height="200" alt="Image preview..." />
            </div>
            <div className='form-group'>
              <label htmlFor='categoryId'>Category</label>
              <select name='categoryId' onChange = { this.onChange }>
                <option> Select Category </option>
                {
                  this.props.categories.map(category => <option key={ category.id } value={ category.id }> { category.name } </option>)
                }
              </select>
            </div>
            <button type='submit' className="btn btn-primary btn-sm"> Create </button>
          </form>
        </ul>
      </div>
    );
  }
}

const mapState = ({ categories, products, user }) => {
  return {
    categories,
    products,
    user
  };
};

const mapDispatch = dispatch => {
  return {
    saveProduct: (product) => dispatch(saveProduct(product)),
  };
};

export default connect(mapState, mapDispatch)(CreateProduct);
