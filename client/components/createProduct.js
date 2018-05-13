import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveProduct } from '../store/products';

class CreateProduct extends Component {
  constructor(product) {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.previewFile = this.previewFile.bind(this);
    this.validators = {
      name: (value) => {
        if (!value) {
          return 'Product name is required.';
        }
      },
      description: (value) => {
        if (!value) {
          return 'Description is required.';
        }
      },
      price: (value) => {
      const regEx= /^\$?[0-9]+(\.[0-9][0-9])?$/;
       if (!value) {
          return 'Price is required.';
        }
      return regEx.test(value) ? null : `Please enter a correct dollar amount. Example: '$20.00' or '20.00`;
      }
    };
    this.state = {
      name: product.name ? product.name : '',
      description: product.description ? product.description : '',
      price: product.price ? product.price : 0,
      categoryId: product.categoryId ? product.categoryId : 1,
      imageUrl: product.imageUrl ? product.imageUrl : '/images/noImage.jpg',
      error: null,
      errors: {}
    };
  }

  previewFile() {
    const preview = document.querySelector('img');
    const file = preview ? document.querySelector('input[type=file]').files[0] : null;
    if(file.size>1048576) {
      alert(file.size +" bites Too big!\n Please upload a 70kb image.");
      return;
    }
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const image = reader.result;
      this.setState({ imageUrl: image });
      preview.src = image;
    }, false);

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  onSave(ev) {
    ev.preventDefault();
    const errors = Object.keys(this.validators).reduce((memo, key) => {
      const validator = this.validators[key];
      const value = this.state[key];
      const error = validator(value);
      if (error) {
        memo[key] = error;
      }
      return memo;
    }, {});
    this.setState({ errors });
    if (Object.keys(errors).length) {
      return;
    }
    const product = this.state;
    this.props.saveProduct(product)
    .catch((err) => {
      this.setState({ error: err.response.data.name });
    });
  }
  onChange(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }
  render(){
    const { user } = this.props;
    const { error, errors } = this.state;
    console.log(errors);
    if (!user || !user.isAdmin) return <h1>You are not authorized to access this page.</h1>;
    return (
      <div>
        <ul>
          <h3> Create New Product </h3>
          {
            error && (
              <div className='error' >
                {
                  error
                }
              </div>
            )
          }
          <form onSubmit={this.onSave}>
            <div className='form-group'>
              <label htmlFor='name'>Name: </label>
              <input name='name' onChange={this.onChange} />
              <div className='error' >{ errors.name }</div>
            </div>
            <div className='form-group'>
              <label htmlFor='price'>Price: </label>
              <input name='price' onChange={this.onChange} />
              <div className='error' >{ errors.price }</div>
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Description: </label>
              <input name='description' onChange={this.onChange} />
              <div className='error' >{ errors.description }</div>
            </div>
            <div>
              <label htmlFor='imageUrl'>Image URL: </label>
              <input type="file" name='imageUrl' onChange={this.previewFile} />
              <img src="/images/upload.png" alt="Image preview..." />
            </div>
            <div className='form-group'>
              <label htmlFor='categoryId'>Category</label>
              <select name='categoryId' onChange={this.onChange}>
                <option> Select Category </option>
                {
                  this.props.categories.map(category => <option key={category.id} value={category.id}> {category.name} </option>)
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

const mapDispatch = (dispatch, { history }) => {
  return {
    saveProduct: (product) => dispatch(saveProduct(product, history)),
  };
};

export default connect(mapState, mapDispatch)(CreateProduct);
