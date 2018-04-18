import React from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './Nav';
import Home from './Home';

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
          { /* Container-fluid is from bootstrap and imposes margins. Placing it here allows the navbar
          to stretch across the screen. */ }
          <Switch>
            <Route path='/' component={ Home } />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default Main;
