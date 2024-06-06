const express = require('express');
const router = express.Router();
const home = require('../controller/base');
require('dotenv').config();

router.get('/', home.homepage);
router.get('/shop', home.shoppage);
router.get('/about-us', home.aboutuspage);
router.get('/shoppingcart', home.cartview)

module.exports = router;
