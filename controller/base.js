const db_functions = require('../data/db_functions');

async function homepage(req, res, next) {
  try {
    let products = await db_functions.getAllProducts();
    // Assuming products is an array, sort and limit using JavaScript if db_functions doesn't handle it
    products = products.sort((a, b) => b._id - a._id).slice(0, 4);
    res.render('index', {
      title: 'Homepage',
      products: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Failed to load homepage.');
  }
}

async function shoppage(req, res, next) {
  try {
    const products = await db_functions.getAllProducts(); // Assuming this function exists and fetches all products
    res.render('userPages/shop', {
      title: 'Shop',
      products: products // Pass products to the view
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    res.status(500).send('Error loading the shop page.');
  }
}

function aboutuspage(req, res, next) {
  res.render('userPages/about-us', {
    title: 'About Us'
  });
}



module.exports = {
  homepage,
  shoppage,
  aboutuspage
}
