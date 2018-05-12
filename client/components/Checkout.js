import React from 'react';
import { Elements } from 'react-stripe-elements';
import InjectedCheckoutForm from './CheckoutForm';

const Checkout = ({ history }) => {
  return (
    <Elements>
      <InjectedCheckoutForm history={ history } />
    </Elements>
  );
};

export default Checkout;
