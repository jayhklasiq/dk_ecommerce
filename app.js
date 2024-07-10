require('dotenv').config();

const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const path = require('path');
const connectDB = require('./data/connect');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');

// Initialize the app
const app = express();
const client = process.env.MONGODB_URI

// Connect to MongoDB
connectDB();

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
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: {
    secure: false, // Set to true if you're using HTTPS
    maxAge: 86400000 // 1 day in milliseconds
  }
}));

// Define Routes
app.use('/', userRoutes);
app.use('/admin', adminRoutes);

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});