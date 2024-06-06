const express = require('express');
const router = express.Router();
const home = require('../controller/base');
require('dotenv').config();

router.get('/', home.homepage);

module.exports = router;