const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');
require('dotenv').config();

router.get('/', admin.addProductPage);
router.post('/', admin.addProductToDB);
router.get('/delete-product', admin.deleteProductPage);
router.post('/delete-product', admin.deleteProduct);

module.exports = router