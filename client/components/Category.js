import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { saveCategory, deleteCategory } from '../store/categories';
import { saveProduct } from '../store/products';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.category ? this.props.category.name : '',
      productId: -1
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
        name: nextProps.category.name
      });
    }
  }
  onChangeInput(ev){
    this.setState({ name: ev.target.value });
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
    const product = this.props.products.find( product => product.id === this.state.productId);
    this.props.saveProduct(product)
    .then(() => this.setState({ productId: -1 }));
  }
  render() {
    const { products, user, category, categories, id, productsOfThisCategory } = this.props;
    const { name, productId } = this.state;
    const { onChangeInput, onSave, onDelete, onSelectProduct, onAddProduct } = this;

    if (!category) {
      return null;
    }
    const nextCategoryIndex = categories.indexOf(category) + 1;
    const nextCategoryId = nextCategoryIndex < categories.length ? categories[nextCategoryIndex].id : categories[0].id;
    const priorCategoryIndex = categories.indexOf(category) - 1;
    const lastCategoryIndex = categories.length - 1;
    const priorCategoryId = priorCategoryIndex !== -1 ? categories[priorCategoryIndex].id : categories[lastCategoryIndex].id;
    const availableProducts = products.filter( product => product.categoryId !== id);

    return (
      <div>
        <h1>{ category.name }</h1>
        <p>Number of products in {category.name}: {productsOfThisCategory.length}</p>
        <Link to={`/categories/${priorCategoryId}`}><button>Prior Category</button></Link>
        <Link to={`/categories/${nextCategoryId}`}><button>Next Category</button></Link>
        {
          user.isAdmin ? (
            <div>
              <form onSubmit={ onSave }>
                <h3>Admin: you may update this category</h3>
                <p>Name:<br />
                <input value={ name } onChange={ onChangeInput } />
                </p>
                <button type="submit"> Update </button>
              </form>

              <form onSubmit={ onAddProduct }>
                <select value={ productId } name="productId" onChange={ onSelectProduct }>
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

                <button disabled={ id * 1 === -1 }>Add Product</button>
                </form>
              <button onClick={ onDelete }>Delete Category</button>
              <div>
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
            </div>
          ) : (
            <div>
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
      </div>
    );
  }
}

const mapState = ({ categories, products, user }, { id }) => {
  const category = categories.find( category => category.id === id );
  const productsOfThisCategory = products.filter( product => product.categoryId === id);
  return {
    category,
    categories,
    products,
    productsOfThisCategory,
    user,
    id
  };
};

const mapDispatch = (dispatch, { history, id }) => {
  return {
    saveCategory: (category) => dispatch(saveCategory(category)),
    deleteCategory: (category) => dispatch(deleteCategory(category, history)),
    saveProduct: (product) => dispatch(saveProduct(Object.assign(product, { categoryId: id })))
  };
};

export default connect(mapState, mapDispatch)(Category);
