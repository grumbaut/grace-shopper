const stripe = require("stripe")("sk_test_LqwHQ45LaOBDNsZHnZOyzazP");

const charge = (token, amount) => {
  stripe.charges.create({
    amount,
    currency: 'usd',
    description: 'Williams-Pomona',
    source: token
  });
};

module.exports = charge;
