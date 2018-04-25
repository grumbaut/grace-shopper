import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories, getProducts } from '../store';

import Nav from './Nav';
import Home from './Home';
import Product from './Product';
import Products from './Products';
import Categories from './Categories';
import Category from './Category';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: []
    };
  }

  componentDidMount() {
    this.props.fetch();
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Nav />
          <div className='container-fluid'>
            <Switch>
              <Route path='/products/:id' component={ Product } />
              <Route path='/products' component={ Products } />
              <Route path='/categories/:id' exact render={({ match })=> <Category id={ match.params.id * 1 }/> } />
              <Route path='/categories' component={ Categories } />
              <Route path='/' component={ Home } />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}

const mapState = null;
const mapDispatch = dispatch => ({
  fetch() {
    dispatch(getCategories());
    dispatch(getProducts());
  }
});

export default connect(mapState, mapDispatch)(Main);
