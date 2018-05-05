import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { saveCategory, deleteCategory, saveProduct } from '../store/categories';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.category ? this.props.category.name : '',
      newCategoryIdForProduct: -1    
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSelectProduct = this.onSelectProduct.bind(this);
    this.onAddProduct = this.onAddProduct.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.category) {
      this.setState({
        name: nextProps.category.name,
      });
    }
  }
  onChangeInput(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onSave(ev){
    ev.preventDefault();
    const category =
      {
        id: this.props.id,
        name: this.state.name
      };
    this.props.saveCategory(category);
  }
  onDelete(){
    this.props.deleteCategory({ id: this.props.id });
  }
  onSelectProduct(ev){
    this.setState({ [ev.target.name]: ev.target.value * 1 });
  }
  onAddProduct(ev){
    ev.preventDefault();
    this.props.saveProduct(this.state.newCategoryIdForProduct)
    .then(() => this.setState({ newCategoryIdForProduct: -1 }));
  }
  render() {
    const { products, user, category, categories, id, productsOfThisCategory } = this.props;
    const { newCategoryIdForProduct } = this.state;
    const { onChangeInput, onSave, onDelete, onSelectProduct, onAddProduct } = this;

    const availableProducts = products.filter( product => product.categoryId !== id);
    
    const nextCategoryIndex = categories.indexOf(category) + 1;
    const nextCategoryId = nextCategoryIndex < categories.length ? categories[nextCategoryIndex].id : categories[0].id;
    const priorCategoryIndex = categories.indexOf(category) - 1;
    const lastCategoryIndex = categories.length - 1;
    const priorCategoryId = priorCategoryIndex !== -1 ? categories[priorCategoryIndex].id : categories[lastCategoryIndex].id;
    
    if (!category) {
      return null;
    }

    return (
      <div>
        {
          user.isAdmin ? (
            <div>
              <form onSubmit= { onSave }>
                <h3>Admin: you may update this category</h3>
                <p>Name:<br />
                <input value={ name } name="name" onChange={ onChangeInput } />
                </p>
                <button type="submit"> Update </button>
              </form>
              <form onSubmit={ onAddProduct }>
                <select value={ newCategoryIdForProduct } name="newCategoryIdForProduct" onChange={ onSelectProduct }>
                  <option value="-1">Select New Product</option>
                  {
                    availableProducts.map( product => {
                      return (
                        <option key={ product.id } value={ product.id }>
                          { product.name }
                        </option>
                      );
                    })
                  }
                </select>
                <button disabled={ id * 1 === -1}>Change</button>
              </form>
              <button onClick={ onDelete }>Delete</button>
            </div>
          ) : (
            <div>
              <h1>{ category.name }</h1>
              <p>Number of products in {category.name}: {productsOfThisCategory.length}</p>
              <p>Products:</p>
              {productsOfThisCategory.length === 0 ?
                <p>There are no products in this category yet</p>
                :
                <div className="row">
                  {
                    productsOfThisCategory.map(product => {
                      return (
                        <ProductCard product={product} key={ product.id } />
                      );
                    })
                  }
                </div>
              }              
            </div>
          )
        }
        <Link to={`/categories/${priorCategoryId}`}><button>Prior</button></Link>
        <Link to={`/categories/${nextCategoryId}`}><button>Next</button></Link>
      </div>
    );
  }
}

const mapState = ({ categories, products }, { id })=> {
  const category = categories.find( category => category.id === id );
  const productsOfThisCategory = products.filter( product => product.categoryId === id);
  return {
    category,
    categories,
    products,
    productsOfThisCategory
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    saveCategory: (category) => dispatch(saveCategory(category)),
    deleteCategory: (category) => dispatch(deleteCategory(category, history)),
    saveProduct: (product) => dispatch(saveProduct(product))
  };
};

export default connect(mapState, mapDispatch)(Category);
