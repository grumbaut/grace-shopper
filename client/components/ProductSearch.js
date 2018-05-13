import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
        <h2>Search for a product:</h2>
        <input value={search} name="search" onChange={ updateSearch } />
        <ul>
          {
            filteredProducts.map( product => <li key={product.id}><Link to={`/products/${product.id}`}><img src={product.imageUrl} width={50} />{product.name}</Link></li>)
          }
        </ul>        
      </div>
    );
  }
}

const mapState = state => ({
  products: state.products
});

export default connect(mapState)(ProductSearch);

