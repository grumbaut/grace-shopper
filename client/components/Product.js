import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveProduct, deleteProduct } from '../store/products';
import ProductCardDetail from './ProductCardDetail';

class Product extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.product ? this.props.product.name : '',
      description: this.props.product ? this.props.product.description : '',
      price: this.props.product ? this.props.product.price : 0,
      imageUrl: this.props.product ? this.props.product.imageUrl : '',
      categoryId: -1,
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.onSaveCategory = this.onSaveCategory.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.product) {
      this.setState({
        name: nextProps.product.name,
        description: nextProps.product.description,
        price: nextProps.product.price,
        categoryId: nextProps.product.categoryId,
        imageUrl: nextProps.product.imageUrl
      });
    }
  }
  onChangeInput(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSaveCategory(ev){
    ev.preventDefault();
    const product = {
      id: this.props.id,
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      imageUrl: this.state.imageUrl,
      categoryId: this.state.categoryId
    };
    this.props.saveProduct(product);
  }
  onSelectCategory(ev){
    this.setState({ [ev.target.name]: ev.target.value * 1 });
  }
  onSave(ev){
    ev.preventDefault();
    const product =
      {
        id: this.props.id,
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        imageUrl: this.state.imageUrl,
      };
    this.props.saveProduct(product);
  }
  onDelete(){
    this.props.deleteProduct({ id: this.props.id });
  }
  render(){
    const { user, product, categories } = this.props;
    const { name, price, description, categoryId } = this.state;
    const { onChangeInput, onSelectCategory, onSaveCategory, onSave, onDelete } = this;
    const quantity = [];
    for (let i = 1; i <= 50; i++) {
      quantity.push(i);
    }
    if (!product) {
      return null;
    }
    const availableCategories = categories.filter( category => category.id !== product.categoryId);
    const productCategory = categories.find(category => category.id === product.categoryId);

    return (
      <div>
        {
          productCategory ? (
            <p>{ product.name } is in our <Link to={`/categories/${productCategory.id}`}>{productCategory.name}</Link> category</p>
          ) : (
            <p>{ product.name } is not in any category yet.</p>
          )
        }
        {
          user.isAdmin ? (
            <div>
            <h1>{ product.name }</h1>
            <img src = { product.imageUrl } width={400} />
            <h2>{`$${product.price}`}</h2>
            <p>{ product.description }</p>
              <form onSubmit= { onSave }>
                <h3>Admin: you may update this product </h3>
                <p>Name:<br />
                <input value={ name } name="name" onChange={ onChangeInput } />
                </p>
                <p>Description:<br />
                <input value={ description } name="description" onChange = { onChangeInput } />
                </p>
                <p>Price:<br />
                <input value={ price } name="price" onChange = { onChangeInput } />
                </p>
                <button type="submit"> Update </button>
              </form>
              <form onSubmit={ onSaveCategory }>
                <p>Current category: {productCategory.name}</p>
                <select value={ categoryId } name="categoryId" onChange={ onSelectCategory }>
                  <option value="-1">Select New Category</option>
                  {
                    availableCategories.map( category => {
                      return (
                        <option key={ category.id } value={ category.id }>
                          { category.name }
                        </option>
                      );
                    })
                  }
                </select>
                <button disabled={ categoryId * 1 === -1}>Change</button>
              </form>
              <button onClick={ onDelete }>Delete</button>
            </div>
          )
          : (
            <div>
              <ProductCardDetail product={ product } />
            </div>
          )
        }
      </div>
      );
    }
}

const mapState = ({ products, categories, user }, { id })=> {
  const product = products.find( product => product.id === id );
  return {
    product,
    categories,
    user
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    saveProduct: (product) => dispatch(saveProduct(product)),
    deleteProduct: (product) => dispatch(deleteProduct(product, history))
  };
};

export default connect(mapState, mapDispatch)(Product);
