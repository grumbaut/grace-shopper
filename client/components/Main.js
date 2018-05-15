import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { getCategories, getProducts, getUserFromToken, getReviews, getOrders, getUsers, getPromoCodes } from '../store';

import Nav from './Nav';
import Home from './Home';
import Product from './Product';
import Products from './Products';
import Login from './Login';
import SignUp from './SignUp';
import Category from './Category';
import CategoryCreate from './CategoryCreate';
import Categories from './Categories';
import EditUser from './EditUser';
import Users from './Users';
import Cart from './Cart';
import Checkout from './Checkout';
import ManageOrders from './ManageOrders';
import AdminOrderStatus from './AdminOrderStatus';
import AdminPromoCodes from './AdminPromoCodes';
import PromoCode from './PromoCode';
import EditOrder from './EditOrder';
import LoggedOut from './LoggedOut';
import Footer from './Footer';
import EditReview from './EditReview';
import CreateProduct from './createProduct';
import AdminCatsAndProds from './AdminCatsAndProds';
import AccountInformation from './AccountInformation';
import AccountSettings from './AccountSettings';
import Addresses from './Addresses';
import EditAddress from './EditAddress';
import ProductSearch from './ProductSearch';
import OrderConfirmation from './OrderConfirmation';

class Main extends React.Component {
  componentDidMount() {
    this.props.fetch();
    if (window.localStorage.getItem('token')) {
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
              <Route path='/categories/:id' exact render={({match, history}) => <Category id={ match.params.id * 1 } history={ history } /> } />
              <Route path='/edit-address/:id' component={ EditAddress } />
              <Route path='/users/:id' exact render={({ match, history }) => <EditUser id={ match.params.id } history={ history } /> } />
              <Route path='/confirmation/:id' component={ OrderConfirmation } />
              <Route path='/users' exact render={({ history }) => <Users history={ history } /> } />
              <Route path='/createProduct' exact render={({history}) => <CreateProduct history={history} />} />
              <Route path='/createcategory' exact render={({history}) => <CategoryCreate history={history} /> } />
              <Route path='/admin-categories-products' component={ AdminCatsAndProds } />
              <Route path='/products/:id' exact render={({match, history}) => <Product id={ match.params.id * 1 } history={ history } /> } />
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
              <Route path='/account-information' component={ AccountInformation } />
              <Route path='/account-settings' component={ AccountSettings } />
              <Route path='/addresses' component={ Addresses } />
              <Route path='/productsearch' component={ ProductSearch } />
              <Route path='/promocodes' exact component={ AdminPromoCodes } />
              <Route path='/promocodes/:id' exact render={({match, history}) => <PromoCode id={ match.params.id * 1 } history={ history } /> } />
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
    dispatch(getPromoCodes())
  },
  getUser(token) {
    dispatch(getUserFromToken(token));
  },
  getUsers() {
    dispatch(getUsers());
  }
});


export default connect(mapState, mapDispatch)(Main);
