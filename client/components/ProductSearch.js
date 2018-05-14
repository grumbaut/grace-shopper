import React from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';

class ProductSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.updateSearch = this.updateSearch.bind(this);
  }
  updateSearch(ev) {
    this.setState({ [ev.target.name]: ev.target.value.toLowerCase().substr(0, 20)});
  }
  render() {
    const { search } = this.state;
    const { updateSearch } = this;
    let filteredProducts = this.props.products.filter(product => {
      return product.name.toLowerCase().indexOf(search) !== -1;
    });
    return (
      <div>
        <h2 className="header">Search for a product:</h2>
        <input value={search} name="search" className='element' placeholder='Search' onChange={ updateSearch } />
        <div id='product-container'>
          {
            filteredProducts.map( product => <ProductCard key={ product.id } product={ product } />)
          }
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  products: state.products
});

export default connect(mapState)(ProductSearch);

