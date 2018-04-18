const conn = require('./conn');
const Category = require('./Category');
const Product = require('./Product');

Product.belongsTo(Category);
Category.hasMany(Product);

const syncAndSeed = ()=>{
  conn.sync({ force: true })
  .then(()=>{
    return Promise.all([
      Category.create({ name:'Kitchen Supplies'}),
      Product.create({ name: 'Mixing Bowl', description: 'Hand carved wooden mixing bowl.', price: 28.00 })
    ]);
  })
  .then(([ category1, product1])=>{
    return Promise.all([
      product1.setCategory(category1)
    ]);
  });
};

module.exports = {
  syncAndSeed,
  models: {
    Category,
    Product
  }
};
