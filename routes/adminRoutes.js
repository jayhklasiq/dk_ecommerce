const express = require('express');
const router = express.Router();
const admin = require('../controllers/adminController');
require('dotenv').config();

router.get('/', admin.addProductPage);
router.post('/', admin.addProductToDB);

module.exports = router