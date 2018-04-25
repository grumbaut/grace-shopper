import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories, getProducts, getUserFromToken, attemptLogin, logout } from '../store';

import Nav from './Nav';
import Home from './Home';
import Product from './Product';
import Products from './Products';
import Login from './Login'
//import { disconnect } from 'cluster';

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
              <Route exact path='/' component={ Home } />
              <Route path='/login' component={ Login } />
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
