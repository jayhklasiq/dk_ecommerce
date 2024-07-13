const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


require('dotenv').config();

router.get('/', userController.homepage);
router.get('/shop', userController.shoppage);
router.get('/about-us', userController.aboutuspage);
router.get('/login', userController.loginPage);
router.post('/login', userController.loginUser);
router.get('/register', userController.registerPage);
router.post('/register', userController.registerUser)
router.get('/shoppingcart', userController.cartpage);
router.post('/addtocart', userController.addtocart);
router.post('/save-message', userController.saveMessage);


module.exports = router;