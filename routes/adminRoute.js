const express = require('express');
const router = express.Router();
const admin = require('../controller/adminControl');
require('dotenv').config();

router.get('/', admin.addProductPage);
router.post('/', admin.addProductToDB);

module.exports = router