import React from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import { Link } from 'react-router-dom';

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
    this.setState({ filter: event.target.value, activePage: 1 });
  }

  changeActivePage(num) {
    this.setState({ activePage: num });
  }

  render() {
    const { categories, promoCodes } = this.props;
    const { activePage } = this.state;
    const { changeActivePage } = this;
    const products = !(this.state.filter * 1)
      ? this.props.products
      :
      this.props.products.filter(product => product.categoryId === Number(this.state.filter));
    const activePromoCodes = promoCodes.filter(promoCode => promoCode.valid === true)
    return (
      <div>
        <div>
          <ul>
            {
              activePromoCodes ? (activePromoCodes.map(activePromoCode => <li> Special Discount {activePromoCode.name} is available! Use code {activePromoCode.password}</li>)
             ) : (
                  <h4>No current promotions - check back soon! </h4>
                )
            }
          </ul>
        </div>
        <div>
          <select value={ this.state.filter } onChange={ this.handleChange }>
            <option value={ 0 }>All Products</option>
            { categories.map(category => (
              <option key={ category.id } value={ category.id }>
                { category.name }
              </option>
            ))}
          </select>
          <Link to="productsearch"><button className="search btn btn-primary btn-sm">Search Products</button></Link>
        </div>
        <div>
          <Paginated activePage={ activePage } products={ products } changeActivePage={ changeActivePage } />
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  products: state.products,
  categories: state.categories,
  promoCodes: state.promoCodes
});

export default connect(mapState)(Products);

const Paginated = ({ activePage, products, changeActivePage }) => {
  const lastIndex = activePage * 6;
  const firstIndex = lastIndex - 6;
  const currentProducts = products.slice(firstIndex, lastIndex);

  const pageNumbers = [];
  for(let i = 1; i <= Math.ceil(products.length/6); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='row justify-content-center'>
      <div className='row'>
        { pageNumbers.map(num => {
          return (
            <span className='page-row' key={ num }>
              <span className='page-numbers' onClick={ () => changeActivePage(num) }>
                { num === activePage ?
                  <strong className='activePage'>{ num }</strong>
                  :
                  num
                }
              </span>
              { num !== pageNumbers[pageNumbers.length - 1 ] ? <span>&nbsp;&bull;&nbsp;</span> : null }
            </span>
          );
        })}
      </div>
      <div id='product-container'>
        { currentProducts.map(product => <ProductCard key={ product.id } product={ product } />) }
      </div>
    </div>
  );
};
