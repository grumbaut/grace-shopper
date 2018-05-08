const Category = require('./Category');
const Product = require('./Product');
const User = require('./User');
const Order = require('./Order');
const Review = require('./Review');

const categories = [
  {
    name: 'Kitchen Supplies'
  },
  {
    name: 'Decorative'
  }
];

const products = [
  {
    name: 'Mixing Bowl',
    description: 'Hand carved wooden mixing bowl.',
    price: 28.00,
    imageUrl: '/images/redmixingbowlset.jpg'
  },
  {
    name: 'Vase',
    description: 'Porcelain longnecked vase, ideal for roses.',
    price: 31.95,
    imageUrl: '/images/vase.jpg'
  },
  {
    name: 'Vanilla Diffuser',
    description: 'A room diffuser with reeds and vanilla oil',
    price: 6.85,
    imageUrl: '/images/vanilladiffuser.jpg'
  },
  {
    name: '4 Slice Toaster',
    description: 'Toast up to four slices at once.',
    imageUrl: '/images/4slicetoaster.jpg',
    price: 35.00,
    displayItem: true
  },
  {
    name: 'Cake Pan',
    description: 'Bake a cake with ease using this cake pan.',
    imageUrl: '/images/cakepan.jpg',
    price: 16.95
  },
  {
    name: 'Cast Iron Wok',
    description: 'This cast iron wok is indestructible.',
    imageUrl: '/images/castironwok.jpg',
    price: 36.25
  },
  {
    name: 'Checkered Placemat Black',
    description: 'Woven checkered placemat great for casual dining.',
    imageUrl: '/images/checkedplacematblack.jpg',
    price: 9.85
  },
  {
    name: 'Checkered Placemat',
    description: 'Woven checkered placemat great for fine dining.',
    imageUrl: '/images/checkedplacemat.jpg',
    price: 9.85
  },
  {
    name: 'Colorful Glass Tumblers',
    description: 'Host fun parties with these colorful glass tumblers.',
    imageUrl: '/images/colorfulglasstumblers.jpg',
    price: 19.85
  },
  {
    name: 'Colorful Wine Glasses',
    description: 'These colorful wine glasses are great for summer festivities.',
    imageUrl: '/images/colorfulwineglasses.jpg',
    price: 25.50
  },
  {
    name: 'Copper Stand Mixer',
    description: 'Make mixing easy with this copper stand mixer.',
    imageUrl: '/images/copperstandmixer.jpg',
    price: 99.85
  },
  {
    name: 'Deep Dish Pan',
    description: 'Create Chicago-style deep dish pizza with this pan.',
    imageUrl: '/images/deepdishpan.jpg',
    price: 20.85
  },
  {
    name: 'Dish Cloths',
    description: 'Clean up the kitchen with this dish cloth set.',
    imageUrl: '/images/dishcloths.jpg',
    price: 16.85
  },
  {
    name: 'Domed Cake Plate',
    description: 'Bake a cake and keep it fresh with this cake plate.',
    imageUrl: '/images/domedcakeplate.jpg',
    price: 20.35
  },
  {
    name: 'Dragon Wine Glass',
    description: 'One of a kind Dragon wine glass will impress your guests.',
    imageUrl: '/images/dragonwineglass.jpg',
    price: 26.25,
    displayItem: true
  },
  {
    name: 'Floral Place Mat',
    description: 'Fancy floral place mat goes great with any meal.',
    imageUrl: '/images/floralplacemat.jpg',
    price: 12.25
  },
  {
    name: 'Floral Serving Platter',
    description: 'Impress your guests with your presentation by using this floral serving platter.',
    imageUrl: '/images/floralservingplatter.jpg',
    price: 22.50
  },
  {
    name: 'Frying Pan Set',
    description: 'This frying pan set will complete and kitchen.',
    imageUrl: '/images/fryingpanset.jpg',
    price: 58.65
  },
  {
    name: 'Pheasant Platter',
    description: 'Gold pheasant platter will impress your guests.',
    imageUrl: '/images/goldpheasantplatter.jpg',
    price: 33.65
  },
  {
    name: 'Lemon Platter',
    description: 'Serving platter with an artful twist.',
    imageUrl: '/images/lemonplatter.jpg',
    price: 28.65
  },
  {
    name: 'Measuring Cups',
    description: 'Measure and mix up something special with this measuring cup set.',
    imageUrl: '/images/measuringcups.jpg',
    price: 20.65
  },
  {
    name: 'Mini Bowl Set',
    description: 'The mini bowl set is great for hosting parties.',
    imageUrl: '/images/minibowlset.jpg',
    price: 35.65
  },
  {
    name: 'Mugs',
    description: 'Enjoy coffee or tea in these sturdy mugs.',
    imageUrl: '/images/mugset.jpg',
    price: 22.65
  },
  {
    name: 'Petal Place Mat',
    description: 'Keep your table safe with this petal place mat.',
    imageUrl: '/images/petalplacemat.jpg',
    price: 10.65
  },
  {
    name: 'Pizza Cutter',
    description: 'Cut up your homemade pizza in style with this pizza cutter.',
    imageUrl: '/images/pizzacutter.jpg',
    price: 16.65
  },
  {
    name: 'Pizza Maker',
    description: 'This pizza maker takes the headache out of making pizzas.',
    imageUrl: '/images/pizzamaker.jpg',
    price: 42.65,
    displayItem: true
  },
  {
    name: 'Pizza Pan',
    description: 'Pizza baking is clean and easy with this pizza pan.',
    imageUrl: '/images/pizzapan.jpg',
    price: 20.65
  },
  {
    name: 'Pizza Slicer',
    description: 'Slice your pizza with ease with this pizza slicer.',
    imageUrl: '/images/pizzaslicer.jpg',
    price: 20.65
  },
  {
    name: 'Pleated Platter Blue',
    description: 'Platter your meals and keep them fresh.',
    imageUrl: '/images/pleatedplatterblue.jpg',
    price: 18.65
  },
  {
    name: 'Pleated Platter',
    description: 'Platter your meals and keep them fresh.',
    imageUrl: '/images/pleatedplatterwhite.jpg',
    price: 18.65
  },
  {
    name: 'Sauce Pot',
    description: 'Simmer you favorite sauce on the stove with this sauce pot.',
    imageUrl: '/images/saucepot.jpg',
    price: 24.65
  },
  {
    name: 'Serving Bowls',
    description: 'Serve up your favorite soup in these lovely bowls.',
    imageUrl: '/images/servingbowlset.jpg',
    price: 25.65
  },
  {
    name: 'Blue Serving Bowls',
    description: 'Serve up your favorite soup in these lovely bowls.',
    imageUrl: '/images/servingbowlsetblue.jpg',
    price: 25.65,
    displayItem: true
  },
  {
    name: 'Soup Pot',
    description: 'Stir up your best soup in this lovely soup pot.',
    imageUrl: '/images/souppot.jpg',
    price: 20.25
  },
  {
    name: 'Square Dipping Bowls',
    description: 'Dipping bowls for all your dipping needs.',
    imageUrl: '/images/squaredipbowls.jpg',
    price: 20.65
  },
  {
    name: 'Square Plate Set',
    description: 'Square plates are great for small appetizers.',
    imageUrl: '/images/squareplateset.jpg',
    price: 20.65
  },
  {
    name: 'Steak Knife Set',
    description: 'Steak dinners require a good set of steak knifes.',
    imageUrl: '/images/steakknifeset.jpg',
    price: 60.65
  },
  {
    name: 'Sugar and Creamer',
    description: 'Sugar and creamer container for your breakfast coffee.',
    imageUrl: '/images/sugarcreamer.jpg',
    price: 18.65
  },
  {
    name: '3 Tier Dessert Platter',
    description: 'Decorate this platter with three layers of assorted desserts.',
    imageUrl: '/images/tiereddessertplatter.jpg',
    price: 19.65
  },
  {
    name: 'Toaster',
    description: 'Toast two slices of bread at the same time.',
    imageUrl: '/images/toaster.jpg',
    price: 28.65
  },
  {
    name: 'Towel Set',
    description: 'Soft and absorbant towel set.',
    imageUrl: '/images/towelset.jpg',
    price: 30.65
  },
  {
    name: 'Vitomix',
    description: `This is the world's best blender.`,
    imageUrl: '/images/vitomix.jpg',
    price: 28.65
  },
  {
    name: 'Wine Glass',
    description: 'The perfect wine glass.',
    imageUrl: '/images/wineglass.jpg',
    price: 12.00,
    displayItem: true
  },
  {
    name: 'Wine Tumbler',
    description: 'Enjoy your favorite wine in this low-key wine glass tumbler.',
    imageUrl: '/images/winetumbler.jpg',
    price: 28.65
  },
  {
    name: 'Wood Mixing Bowl',
    description: 'Wood mixing bowl perfect for baking.',
    imageUrl: '/images/woodmixingbowl.jpg',
    price: 22.65
  },
  {
    name: 'Wood Pizza Peel',
    description: 'Pull your pizza out of the oven like a pro with this pizza peel.',
    imageUrl: '/images/woodpizzapeel.jpg',
    price: 32.65
  },
  {
    name: 'Wood Spoon Set',
    description: 'Wooden spoons for a more rustic table setting.',
    imageUrl: '/images/woodspoonsset.jpg',
    price: 25.00
  },
  {
    name: 'Woven Place Mat',
    description: 'Complete your table setting with this woven place mat.',
    imageUrl: '/images/wovenplacemat.jpg',
    price: 15.00
  }
];

const users = [
  {
    firstName: 'Alice',
    lastName: 'Buyer',
    email: 'alice@wonderland.com',
    isAdmin: true,
    password: 'ALICE'
  },
  {
    firstName: 'Bob',
    lastName: 'Bill',
    email: 'bob@wonderland.com',
    isAdmin: false,
    password: 'BOB'
  },
  {
    firstName: 'Cat',
    lastName: 'Purchase',
    email: 'cat@wonderland.com',
    isAdmin: false,
    password: 'CAT'
  }
];

const reviews = [
  {
    content: 'I really do LOVE this product! I tell all my friends and I cant imagine hosting a dinner party or cooking a meal without this in the kitchen.',
    rating: 5,
    productId: 1,
    userId: 1
  },
  {
    content: 'Solid, sturdy, perfect addition to my collection of kitchen supplies. I would buy this again.',
    rating: 4,
    productId: 1,
    userId: 2
  },
  {
    content: 'Good for the home, good as a last minute gift idea. Not a huge fan of the color options.',
    rating: 3,
    productId: 2,
    userId: 3
  },
  {
    content: 'I bought this product and it is not what I was looking for. Never trust a jpeg, I had no idea it would be this size. I will probably return it once I find the reciept. My fault for shopping online instead of at the Williams-Pomona in the city.',
    rating: 1,
    productId: 3,
    userId: 1
  }
];

const randomCategoryId = () => Math.ceil(Math.random() * categories.length);

const seed = () => {
  return Promise.all(categories.map( category => Category.create(category)))
  .then(() => {
    return products.map( product => Product.create(Object.assign(product, {categoryId: randomCategoryId()})))
  })
  .then(() => {
    return Promise.all(users.map( user => User.create(user)))
  })
  .then(() => {
    return Promise.all(reviews.map( review => Review.create(review)))
  })
  .then(() => User.findById(1))
  .then( user => Promise.all([
    Order.findOrCreateCart(user.id),
    Product.findById(3)
  ]))
  .then(([order, product]) => order.addToCart(1, product))
  .catch( err => { throw err } )
}

module.exports = seed;
