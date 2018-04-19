import React from 'react';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: null
    };
  }

  handleChange(event) {
    this.setState({ filter: event.target.value });
  }

  render() {
    const { categories } = this.props;
    const products = !this.state.filter
      ? this.props.products
      :
      this.props.products.filter(product => product.categoryId === Number(this.state.filter));


    return (
      <div>
        <select value='this.state.filter' onChange={ this.handleChange }>
          <option>--Filter by category--</option>
          { categories.map(category => (
            <option key={ category.id } value={ category.id }>
              { category.name }
            </option>
          ))}
        </select>
        { /* render products here--likely through a product card component we can reuse */ }
      </div>
    );
  }
}

export default Products;
