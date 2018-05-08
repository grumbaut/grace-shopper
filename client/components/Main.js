import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategories, getProducts, getUserFromToken, getReviews, getOrders } from '../store';

import Nav from './Nav';
import Home from './Home';
import Product from './Product';
import Products from './Products';
import Login from './Login';
import SignUp from './SignUp';
import Category from './Category';
import Categories from './Categories';
import Users from './Users';
import Cart from './Cart';
import Checkout from './Checkout';
import ManageOrders from './ManageOrders';
import EditOrder from './EditOrder';
import LoggedOut from './LoggedOut';
import Footer from './Footer';
import EditReview from './EditReview';

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
              <Route path='/users' exact component = { Users } />
              <Route path='/products/:id' exact render={({match, history})=> <Product id={ match.params.id * 1 } history={ history } /> } />
              <Route path='/categories/:id' exact render={({match})=> <Category id={ match.params.id * 1 } /> } />
              <Route path='/edit-order/:id' component={ EditOrder } />
              <Route path='/manage-orders' component={ ManageOrders} />
              <Route path='/edit-reviews/:id' exact render={({match, history})=> <EditReview id={ match.params.id * 1 } history={ history } /> } />
              <Route path='/logged-out' component={ LoggedOut } />
              <Route path='/products' component={ Products } />
              <Route path='/checkout' component={ Checkout } />
              <Route path='/signup' component={ SignUp } />
              <Route path='/login' component={ Login } />
              <Route path='/cart' component={ Cart } />
              <Route path='/categories' component={ Categories } />
              <Route exact path='/' component={ Home } />
            </Switch>
          </div>
          <Footer />
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
    dispatch(getReviews());
    dispatch(getOrders());
  },
  getUser(token) {
    dispatch(getUserFromToken(token));
  }
});


export default connect(mapState, mapDispatch)(Main);
