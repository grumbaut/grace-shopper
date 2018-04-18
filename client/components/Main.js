import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './Nav';
import Home from './Home';
import Product from './Product';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      products: []
    };
  }

  render() {
    return (
      <HashRouter>
        <Nav />
        <div className='container-fluid'>
          <Switch>
            <Route path='/products/:id' component={ Product } />
            <Route path='/' component={ Home } />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
