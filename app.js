// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const path = require('path');
// const createError = require('http-errors');
const connectDB = require('./data/connect');
const homeRoute = require('./routes/index');


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

// Define Routes
app.use('/', homeRoute);

// Connect to MongoDB
connectDB();

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});