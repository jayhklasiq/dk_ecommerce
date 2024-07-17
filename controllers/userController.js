const db_functions = require('../data/db_functions');
const user_functions = require('../data/user_functions');
const { ObjectId } = require('mongodb');


async function homepage(req, res, next) {
  try {
    let products = await db_functions.getAllProducts();
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
    const products = await db_functions.getAllProducts();
    res.render('userPages/shop', {
      title: 'Shop',
      products: products
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

function loginPage(req, res) {
  const notice = req.query.notice;
  res.render('userPages/login', {
    title: 'Login',
    notice: notice
  });
}

function registerPage(req, res) {
  const notice = req.query.notice;
  res.render('userPages/register', {
    title: 'Register',
    notice: notice
  });
}

async function registerUser(req, res) {
  const { name, email, password } = req.body;
  const existingUser = await user_functions.getUserByEmail({ email });

  if (existingUser) {
    res.redirect('/login?notice=User already exists');
  } else {
    await user_functions.createUser({
      username: name,
      email,
      password
    });

    res.redirect('/login?notice=User created successfully.');
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await user_functions.getUserByEmail({ email });

  if (!user) {
    return res.redirect('/register?notice=User not found, please register');
  } else if (user.password === password) {
    req.session.userId = new ObjectId(user._id);
    req.session.userName = user.username
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.redirect('/login?notice=Login failed, please try again.');
      }
      res.redirect('/shoppingcart');
    });
  } else {
    return res.redirect('/login?notice=Invalid password');
  }
}

async function cartpage(req, res) {
  try {
    if (!req.session.userId) {
      return res.redirect('/login?notice=Please login to view the cart');
    }

    const cartItems = await user_functions.loadCartItems(req.session.userId);
    let totalAmount = 0;

    // Iterate through the cart items and access the items array
    const formattedCartItems = cartItems.map(cart => {
      return cart.items.map(item => {
        totalAmount += item.price;
        return item;
      });
    }).flat();

    const shippingOptions = [
      { name: 'Standard Shipping', price: 5 },
      { name: 'Express Shipping', price: 10 }
    ];

    res.render('userPages/shoppingcart', {
      title: 'Shopping Cart',
      cartItems: formattedCartItems,
      totalAmount,
      shippingOptions,
      username: req.session.userName
    });
  } catch (error) {
    console.error('Error loading cart page:', error);
    res.status(500).send('Error loading the shopping cart page.');
  }
}

async function saveMessage(req, res) {
  const { name, email, message } = req.body
  await user_functions.saveMessage({
    username: name,
    email,
    message
  });
  console.log("Your message has been sent. We will reach out to you within the next 42 hours.");
}

async function addtocart(req, res) {
  if (!req.session.userId) {
    return res.redirect('/login?notice=Please login to add items to the cart');
  }

  const productId = req.body.productId;
  if (!productId) {
    return res.status(400).send("Product ID is missing.");
  }

  const productData = await db_functions.getProductById({ productId });

  if (!productData) {
    return res.status(404).send("Product not found.");
  }

  const cartItem = {
    productId: new ObjectId(productData._id),
    productName: productData.productName,
    price: Number(productData.price),
    imageURL: productData.imageURL,
    description: productData.description
  };

  if (req.session.cart) {
    req.session.cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem]
    };
  }

  req.session.save((err) => {
    if (err) {
      console.error('Session save error:', err);
      return res.status(500).send('Failed to add item to cart.');
    }
    // res.redirect('/shoppingcart');
    console.log(req.session.userId);
    console.log(req.session.cart);

    res.redirect('/shoppingcart')
  });

  await user_functions.addToCart({
    userId: new ObjectId(req.session.userId),
    items: [cartItem]
  });
}

async function removeCartItem(req, res) {
  try {
    if (!req.session.userId) {
      return res.redirect('/login?notice=Please login to view the cart');
    }

    const itemId = req.body.itemId;
    await user_functions.removeCartItem(req.session.userId, itemId);

    res.redirect('/shoppingcart');
  } catch (error) {
    console.error('Error removing cart item:', error);
    res.status(500).send('Error removing the item from the cart.');
  }
}

async function processOrder(req, res) {
  const { name, address, phone, totalAmount } = req.body;
  const userId = req.session.userId
  const cartItems = await user_functions.getUserCart({ userId });
  try {
    await user_functions.addOrder({ name, address, phone, cartItems, totalAmount });
    res.json({
      message: 'Your order has been placed. You will get a call from a dispatch soon.',
      "Your Orders": cartItems.items,
      Total: totalAmount
    });

    await user_functions.deleteCartItems({ userId });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).send('Error processing the order.');
  }
}

module.exports = {
  homepage,
  shoppage,
  aboutuspage,
  loginPage,
  loginUser,
  registerPage,
  registerUser,
  addtocart,
  cartpage,
  saveMessage,
  removeCartItem,
  processOrder
};