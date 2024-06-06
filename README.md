# DK E-commerce Project

## Overview

This is an E-commerce platform developed using Node.js and Express. It is designed to manage products, users, orders, and shopping carts, and connects to a MongoDB database for data storage. The application serves dynamic web pages using EJS templates and static files like images, CSS, and JavaScript.

## Features

- User authentication and authorization
- Product management (CRUD operations)
- Shopping cart functionality
- Order management
- RESTful API for product and user data
- Error handling and custom error pages

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/your-username/dk-ecommerce.git
   ```

2. **Navigate to the project directory**

   ```sh
   cd dk-ecommerce
   ```

3. **Install dependencies**

   ```sh
   pnpm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory and add your MongoDB URI and any other environment variables required:
   ```sh
   MONGODB_URI=your-mongodb-uri
   PORT=3000
   NODE_ENV=development
   ```

### Running the Application

1. **Start the development server**

   ```sh
   npm start
   ```

2. **Open your browser and navigate to**
   ```sh
   http://localhost:3000
   ```

## Usage

### Static Files

Static files like images, CSS, and JavaScript are served from the `public` directory. To add new static files, place them in the appropriate subdirectory within `public` and link to them in your EJS templates using absolute paths starting with `/`.

### Routing

Routes are defined in the `routes` directory. The main route file is `index.js`, which handles routing for the homepage and other pages.

### Database Connection

The database connection is managed in `data/connect.js`. Ensure your MongoDB URI is correctly set in the `.env` file.

### Error Handling

Custom error handling is implemented to capture 404 errors and other server errors. Error templates are rendered using EJS.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [EJS](https://ejs.co/)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

---

Feel free to reach out if you have any questions or need further assistance!
