const cart_functions = require('../data/cart_functions');
const db_functions = require('../data/db_functions');
const userFunctions = require('../data/user_functions');


function cartview(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login?notice=Please login to add to cart');
  }
  res.render('userPages/shoppingcart', {
    title: 'Shopping Cart'
  });
}

async function addToCart(req, res, next) {
  if (!req.session.userId) {
    return res.redirect('/login?notice=Please login to add to cart');
  }

  const productId = req.body.productId; // Change from req.query to req.body
  if (!productId) {
    return res.status(400).send("Product ID is missing.");
  }

  const productData = await db_functions.getProductById({ productId });
  if (!productData) {
    return res.status(404).send("Product not found.");
  }

  await cart_functions.addToCart({
    userId: req.session.userId,
    productId: productData._id,
    productName: productData.productName,
    price: productData.price,
    imageURL: productData.imageURL
  });

  res.redirect('/shoppingcart');
}

async function handleLogin(req, res, next) {
  const { email, password } = req.body;
  const user = await userFunctions.getUserByEmail({ email });

  if (!user) {
    return res.redirect('/register?notice=User not found, please register');
  }

  if (user && user.password === password) {
    console.log('User authenticated:', req.session);

    req.session.userId = user._id;
    console.log(req.session.userId);

    return res.redirect('/shoppingcart');
  } else {
    console.log('Invalid password');
    return res.redirect('/login?notice=Invalid password');
  }
}

async function handleRegister(req, res) {
  const { name, email, password } = req.body;
  const user = await userFunctions.createUser({
    username: name,
    email,
    password
  });
  if (user) {
    res.redirect('/login');
  } else {
    res.render('userPages/login', { error: 'Registration failed' });
  }
}

function loginPage(req, res) {
  // Extract the notice query parameter and pass it to the EJS template
  const notice = req.query.notice;
  res.render('userPages/login', {
    title: 'Login',
    notice: notice
  });
}

function registerPage(req, res) {
  // Extract the notice query parameter and pass it to the EJS template
  const notice = req.query.notice;
  res.render('userPages/login', { // Ensure this should be 'register' if it's a different page
    title: 'Register',
    notice: notice
  });
}

module.exports = {
  cartview,
  addToCart,
  loginPage,
  registerPage,
  handleLogin,
  handleRegister
};