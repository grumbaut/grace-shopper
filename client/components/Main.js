import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCategories, getProducts, getUserFromToken, getReviews, getOrders, getUsers } from '../store';

import Nav from './Nav';
import Home from './Home';
import Product from './Product';
import Products from './Products';
import Login from './Login';
import SignUp from './SignUp';
import Category from './Category';
import CategoryCreate from './CategoryCreate';
import Categories from './Categories';
import AdminIndex from './AdminIndex';
import EditUser from './EditUser';
import Users from './Users';
import Cart from './Cart';
import Checkout from './Checkout';
import ManageOrders from './ManageOrders';
import AdminOrderStatus from './AdminOrderStatus';
import EditOrder from './EditOrder';
import LoggedOut from './LoggedOut';
import Footer from './Footer';
import EditReview from './EditReview';
import CreateProduct from './CreateProduct';

class Main extends React.Component {
  constructor(props) {
    super(props);
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
              <Route path='/users/:id' exact render={({ match, history }) => <EditUser id={ match.params.id } history={ history } /> } />
              <Route path='/users' exact render={({ history }) => <Users history={ history } /> } />
              <Route path='/createProduct' exact component = { CreateProduct } />
              <Route path='/createcategory' exact render={({history}) => <CategoryCreate history={history} /> } />
              <Route path='/products/:id' exact render={({match, history}) => <Product id={ match.params.id * 1 } history={ history } /> } />
              <Route path='/categories/:id' exact render={({match, history}) => <Category id={ match.params.id * 1 } history={ history } /> } />
              <Route path='/edit-order/:id' component={ EditOrder } />
              <Route path='/orders' component={ AdminOrderStatus } />
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
  },
  getUsers() {
    dispatch(getUsers());
  }
});


export default connect(mapState, mapDispatch)(Main);
