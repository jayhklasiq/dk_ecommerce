const db_functions = require('../data/db_functions');

function addProductPage(req, res, next) {
  res.render(
    'adminPages/add-product', { title: 'Add Product', notice: '' }
  )
}

async function addProductToDB(req, res, next) {
  const { category, productName, description, price, imageURL } = req.body;

  console.log('Received request body:', req.body.category);

  try {
    const productData = await db_functions.createProduct({
      category,
      productName,
      description,
      price,
      imageURL
    })
    console.log(productData);
    // res.json({ Message: 'Product added successfully' })
    res.render('adminPages/add-product', { title: 'Add Product', notice: 'Product added successfully' })
  }
  catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Error adding product to the database.');
  };
}

module.exports = {
  addProductPage,
  addProductToDB
}