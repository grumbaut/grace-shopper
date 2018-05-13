import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveProduct, deleteProduct } from '../store/products';
import ProductCardDetail from './ProductCardDetail';
import Review from './Review';
import EditReview from './EditReview';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.product ? this.props.product.name : '',
      description: this.props.product ? this.props.product.description : '',
      price: this.props.product ? this.props.product.price : 0,
      imageUrl: this.props.product ? this.props.product.imageUrl : '',
      categoryId: -1,
      errors: {}
    };
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.onSaveCategory = this.onSaveCategory.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
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
      return regEx.test(value) ? null : 'Please enter a valid price amount.';
      }
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.product) {
      this.setState({
        id: nextProps.product.id,
        name: nextProps.product.name,
        description: nextProps.product.description,
        price: nextProps.product.price,
        categoryId: nextProps.product.categoryId,
        imageUrl: nextProps.product.imageUrl
      });
    }
  }
  onChangeInput(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  onSaveCategory(ev) {
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

  onSelectCategory(ev) {
    this.setState({ [ev.target.name]: ev.target.value * 1 });
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

  onDelete() {
    this.props.deleteProduct({ id: this.props.id });
  }

  render() {
    const { user, product, categories, reviews, id, purchased, history, reviewed } = this.props;
    const { name, price, description, categoryId, errors } = this.state;
    const { onChangeInput, onSelectCategory, onSaveCategory, onSave, onDelete } = this;
    if (!product) {
      return null;
    }
    const availableCategories = categories.filter(category => category.id !== product.categoryId);
    const productCategory = categories.find(category => category.id === product.categoryId);
    const reviewHeader = reviews.filter(review => review.productId === product.id).length ? 'Reviews:' : 'There are no reviews for this product yet.';
    return (
      <div className="row">
        <div className="col">
          {
            productCategory ? (
              <p>{product.name} is in our <Link to={`/categories/${productCategory.id}`}>{productCategory.name}</Link> category</p>
            ) : (
              <p>{product.name} is not in any category yet.</p>
            )
          }
          <ProductCardDetail product={product} />
          <h3>{reviewHeader}</h3>
          {purchased ? (reviewed ?
            <Link to={`/edit-reviews/${reviewed.id}`} >Edit Your Review</Link>
            :
            <EditReview product={product} history={history}>Add Review</EditReview>) : null
          }
          {
            reviews.map(review => {
              if (review.productId === id) return <Review review={review} key={review.id} />;
            })
          }
         </div>
        {
          user.isAdmin ? (
            <div className="col">
              <form onSubmit={onSave}>
                <h3>Admin: you may update this product </h3>
                <p>Name:<br />
                  <input value={name} name="name" onChange={onChangeInput} />
                </p>
                <div className='error' >{ errors.name }</div>
                <p>Description:<br />
                  <input value={description} name="description" onChange={onChangeInput} />
                </p>
                <div className='error' >{ errors.description }</div>
                <p>Price:<br />
                  <input value={price} name="price" onChange={onChangeInput} />
                </p>
                <div className='error' >{ errors.price }</div>
                <button type="submit"> Update </button>
              </form>
              <form onSubmit={ onSaveCategory }>
                <select value={ categoryId } name="categoryId" onChange={ onSelectCategory }>
                  <option value="-1">Select New Category</option>
                  {
                    availableCategories.map(category => {
                      return (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      );
                    })
                  }
                </select>
                <button disabled={categoryId * 1 === -1}>Change</button>
              </form>
              <button onClick={onDelete}>Delete</button>
            </div>
          ) : null
        }
      </div>
    );
  }
}

const mapState = ({ products, categories, user, reviews, orders }, { id, history }) => {
  const product = products.find(product => product.id === id);
  const purchasedOrder = orders.filter(order => order.status === 'processing');
  const purchased = purchasedOrder.reduce((memo, current) => {
    memo = memo.concat(current.lineitems);
    return memo;
  }, []).find(item => item.productId === id) ? true : false;
  const reviewed = product ? ( reviews.filter(review => review.productId === product.id).find(review => review.userId === user.id)) : null;

  return {
    product,
    categories,
    user,
    reviews,
    id,
    purchased,
    history,
    reviewed
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    saveProduct: (product) => dispatch(saveProduct(product)),
    deleteProduct: (product) => dispatch(deleteProduct(product, history))
  };
};

export default connect(mapState, mapDispatch)(Product);
