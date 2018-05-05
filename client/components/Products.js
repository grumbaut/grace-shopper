import React from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';

class Products extends React.Component {
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

        <select value={ this.state.filter } onChange={ this.handleChange }>
          <option value={ 0 }>All Products</option>
          { categories.map(category => (
            <option key={ category.id } value={ category.id }>
              { category.name }
            </option>
          ))}
        </select>
        <div className="row">
        { products.map(product => <ProductCard key={ product.id } className="col" product={ product } history={ this.props.history } />)}
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  products: state.products,
  categories: state.categories
});

export default connect(mapState)(Products);
