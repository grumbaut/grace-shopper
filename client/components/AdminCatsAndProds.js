import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AdminCatsAndProds extends React.Component {
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
      <div className="row">
        <div className="col">
          <h1>All Categories</h1>
          <p>Number of Categories: { categories.length }</p>
          <ul>
            {
              categories.map(category => {
                return (
                  <div key={ category.id }>
                    <Link to={`categories/${category.id}`}>{category.name}</Link>
                    <p>Number of products: {products.filter( product => product.categoryId === category.id).length}</p>
                  </div>
                )
              })
            }
          </ul>
        </div>
        <div className="col">
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
      </div>
    );
  }
}

const mapState = state => ({
  products: state.products,
  categories: state.categories
});

export default connect(mapState)(AdminCatsAndProds);
