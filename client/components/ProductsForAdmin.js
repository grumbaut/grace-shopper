import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ProductsForAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ filter: event.target.value });
  }

  render() {
    const { categories } = this.props;
    const products = !(this.state.filter * 1)
      ? this.props.products
      :
      this.props.products.filter(product => product.categoryId === Number(this.state.filter));
    return (
      <div>
        <h2>Select Product To Update</h2>
        <br />
        <select value={ this.state.filter } onChange={ this.handleChange }>
          <option value={ 0 }>All Products</option>
          { categories.map(category => (
            <option key={ category.id } value={ category.id }>
              { category.name }
            </option>
          ))}
        </select>

        <div>
          <ul>
            { 
              products.map(product => <li key={product.id}><Link to={`/products/${product.id}`}><img src={product.imageUrl} width={50} />{product.name}</Link></li>)          
            }        
          </ul>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  products: state.products,
  categories: state.categories
});

export default connect(mapState)(ProductsForAdmin);
