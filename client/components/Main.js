import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories, getProducts, getUsers, saveUser, getUserFromToken, getReviews } from '../store';

import Nav from './Nav';
import Home from './Home';
import createProduct from './createProduct';
import Product from './Product';
import Products from './Products';
import Login from './Login';
import SignUp from './SignUp';
import Category from './Category';
import Categories from './Categories';
import AdminIndex from './AdminIndex';
import EditUser from './EditUser'
import Users from './Users';
import Cart from './Cart';
import Checkout from './Checkout';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: [],
      users: [],
      reviews: []
    };
  }
  
  componentDidMount() {
    this.props.fetch();
    if(window.localStorage.getItem('token')) {
      const token = window.localStorage.getItem('token');
      this.props.getUser(token);
    }
  }

  render() {
    return (
      <HashRouter>
        <div>
          <Nav />
          <div className='container-fluid'>
            <Switch>
              <Route path='/admin' exact component = { AdminIndex } />
              <Route path='/users' exact component = { Users } />
              <Route path='/users/:id' exact render={({match})=> <EditUser id={ match.params.id * 1 } /> } />
              <Route path='/createProduct' exact component = { createProduct } />
              <Route path='/products/:id' exact render={({match, history})=> <Product id={ match.params.id * 1 } history={ history } /> } />
              <Route path='/categories/:id' exact render={({match})=> <Category id={ match.params.id * 1 } /> } />
              <Route path='/products' component={ Products } />
              <Route path='/checkout' component={ Checkout } />
              <Route path='/signup' component={ SignUp } />
              <Route path='/login' component={ Login } />
              <Route path='/cart' component={ Cart } />
              <Route path='/categories' component={ Categories } />
              <Route exact path='/' component={ Home } />
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
    dispatch(getUsers());
    dispatch(getReviews());
  },
  getUser(token) {
    dispatch(getUserFromToken(token));
  }
});


export default connect(mapState, mapDispatch)(Main);
