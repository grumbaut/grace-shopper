import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Main from './components/Main';
import { StripeProvider } from 'react-stripe-elements';

ReactDOM.render(
  <Provider store={ store }>
    <StripeProvider apiKey='pk_test_AhLiCUGnPSZ5IySTH3Givqd0'>
      <Main />
    </StripeProvider>
  </Provider>,
  document.getElementById('root')
);
