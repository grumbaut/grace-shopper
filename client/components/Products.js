import React from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: 0,
      activePage: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.changeActivePage = this.changeActivePage.bind(this);
  }

  handleChange(event) {
    this.setState({ filter: event.target.value });
  }

  changeActivePage(num) {
    this.setState({ activePage: num });
  }

  render() {
    const { categories } = this.props;
    const { activePage } = this.state;
    const { changeActivePage } = this;
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
        <div>
          <Paginated activePage={ activePage } products={ products } changeActivePage={ changeActivePage } />
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

const Paginated = ({ activePage, products, changeActivePage }) => {
  const lastIndex = activePage * 5;
  const firstIndex = lastIndex - 5;
  const currentProducts = products.slice(firstIndex, lastIndex);

  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(products.length/5); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='row justify-content-center'>
      <div className='row justify-content-center'>
        { currentProducts.map(product => <ProductCard key={ product.id } product={ product } />) }
      </div>
      <div className='row'>
        { pageNumbers.map(num => {
          return (
            <span className='page-row' key={ num }>
              <span className='page-numbers' onClick={ () => changeActivePage(num) }>
                { num === activePage ?
                  <strong>{ num }</strong>
                  :
                  num
                }
              </span>
              { num !== pageNumbers[pageNumbers.length - 1 ] ? <span>&nbsp;&bull;&nbsp;</span> : null }
            </span>
          );
        })}
      </div>
    </div>
  );
};
