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
    const { user, categoy, id } = this.props;
    const { newCategoryIdForProduct } = this.state;
    const { onChangeInput, onSave, onDelete, onSelectProduct, onAddProduct } = this;
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

          ) : (
            
          );
        }

      </div>
    );
  }
}
  
  
  
  
  
  
  


  /* return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1>{ category.name }</h1>
          <p>Number of products in {category.name}: {productsOfThisCategory.length}</p>
          <p>Products:</p>
          {
            productsOfThisCategory.length === 0 ? (
              <p>There are no products in this category yet</p>
            ) : (
            <div>
              {
                productsOfThisCategory.map(product => {
                  return (
                    <div key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  );
                })
              }
            </div>
          )
          }
        </div>
        <div className="col">
            <Link to={`/categories/${priorCategoryId}`}><button>Prior</button></Link>
            <Link to={`/categories/${nextCategoryId}`}><button>Next</button></Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ categories, products }, { id })=> {
  const category = categories.find( category => category.id === id );
  const productsOfThisCategory = products.filter( product => product.categoryId === id);
  return {
    category,
    categories,
    products,
    productsOfThisCategory
  };
};
*/

export default connect(mapStateToProps)(Category);
