require('dotenv').config();

const express = require('express');
const router = express.Router();
const home = require('../controller/base');
const userpage = require('../controller/user');
const passport = require('passport');


// Middleware to ensure user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // Redirect to login with the original URL they were trying to access
  res.redirect(`/login?returnUrl=${encodeURIComponent(req.originalUrl)}`);
}

router.get('/', home.homepage);
router.get('/shop', home.shoppage);
router.get('/about-us', home.aboutuspage);
router.get('/shoppingcart', ensureAuthenticated, userpage.cartview);
// router.post('/shoppingcart', userpage.ensureAuthenticated, userpage.addToCart);
router.get('/login', userpage.loginPage);
router.post('/login', userpage.handleLogin);
router.get('/register', userpage.registerPage);
router.post('/register', userpage.handleRegister);
router.post('/addToCart', ensureAuthenticated, userpage.addToCart);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/addToCart',
    failureRedirect: '/login'
  }));

module.exports = router;
