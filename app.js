require('dotenv').config();

// Import required modules
const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const path = require('path');
// const createError = require('http-errors');
const connectDB = require('./data/connect');
const homeRoute = require('./routes/indexRoute');
const adminRoue = require('./routes/adminRoute');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
require('./utilities/auth'); // Load Passport configuration


// Initialize the app
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set("layout", "./layout/layout");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize and configure session middleware
app.use(session({
  secret: process.env.SESSION,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    maxAge: 86400000
  }
}));

// Initialize Passport and configure it to use sessions
app.use(passport.initialize());
app.use(passport.session());

// Define Routes
app.use('/', homeRoute);
app.use('/admin', adminRoue);

// Connect to MongoDB
connectDB();

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});