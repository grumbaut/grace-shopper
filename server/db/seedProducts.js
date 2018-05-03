const productArray = [
  // {
  //   name: 'Mixing Bowl',
  //   description: 'Hand carved wooden mixing bowl.',
  //   price: 28.00,
  //   imageUrl: '/images/redmixingbowlset.jpg'
  // },
  // {
  //   name: 'Vase',
  //   description: 'Porcelain longnecked vase, ideal for roses.',
  //   imageUrl: '/images/vase.jpg',
  //   price: 31.95
  // },
  // {
  //   name: 'Vanilla Diffuser',
  //   description: 'A room diffuser with reeds and vanilla oil.',
  //   imageUrl: '/images/vanilladiffuser.jpg',
  //   price: 6.85
  // },
  {
    name: '4 Slice Toaster',
    description: 'Toast up to four slices at once.',
    imageUrl: '/images/4slicetoaster.jpg',
    price: 35.00
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
    price: 26.25
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
    price: 42.65
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
    price: 25.65
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
  }
];

module.exports = productArray;
