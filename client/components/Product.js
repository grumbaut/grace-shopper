import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import ProductCard from './ProductCard';
import { saveProduct, deleteProduct } from '../store/products';

class Product extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: this.props.product ? this.props.product.name : '',
      description: this.props.product ? this.props.product.description : '',
      price: this.props.product ? this.props.product.price : 0,
      // categoryId: this.props.product ? this.props.product.categoryId : -1,
      imageUrl: this.props.product ? this.props.product.imageUrl : '',
      categoryId: -1
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
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
  onSave(ev){
    ev.preventDefault();
    const product =
      {
        id: this.props.id, 
        name: this.state.name, 
        description: this.state.description,
        price: this.state.price, 
        imageURL: this.state.imageURL
      }
    this.props.saveProduct(product);
  }
  onChangeInput(ev){
    this.setState({ [ev.target.name]: ev.target.value });
  }
  onDelete(){
    this.props.deleteProduct({ id: this.props.id });
  }
  onSelectCategory(ev){
    ev.preventDefault();
    const product = {
      id: this.props.id,
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      imageUrl: this.state.imageURL,
      categoryid: this.state.categoryId
    }
  }
  onChangeCategory(ev){
    this.setState({ [ev.target.name]: ev.target.value * 1 });
  }
  render(){
    const { user, product, categories, id } = this.props;
    const { name, price, imageUrl, description, categoryId } = this.state;
    const { onChangeInput, onSelectCategory, onChangeCategory, onSave, onDelete } = this;
    if (!product) {
      return null;
    }
    const availableCategory = categories.filter( category => category.id !== product.categoryId);
    const productCategory = categories.find(category => category.id === product.categoryId);

    return (      
      <div>
          <h1>{ product.name }</h1>
          <img src = { product.imageUrl } width={400} />
          <h2>{`$${product.price}`}</h2>
          <p>{ product.description }</p>   
        <p>{ product.name } is in our <Link to={`/categories/${productCategory.id}`}>{productCategory.name}</Link> category</p>        
        {
          user.isAdmin ? (
            <form onSubmit= { onSave }>
            <h3>Admin: you may update this product </h3>
                <li> Price <input name =  'price' onChange = { this.onChange } ></input> </li>
                <li> Name <input onChange = { this.onChange } name = 'name'></input> </li>
                <li> Category <input onChange = { this.onChange } name = 'categoryId'></input> </li>
                <button type='submit'> Update </button>
            </form>
          )

          : (<button> Add to cart</button>)
        }
        
      </div>
      )
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
    saveProduct: (product) => dispatch(saveProduct(product, history)),
    deleteProduct: (product) => dispatch(deleteProduct(product, history))
  }
}

export default connect(mapState, mapDispatch)(Product);
