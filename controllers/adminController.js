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



function deleteProductPage(req, res, next) {
  res.render(
    'adminPages/delete-product', { title: 'Add Product', notice: '' }
  )
}


async function deleteProduct(req, res, next) {
  const { productId, productName } = req.body;

  try {
    const product = await db_functions.getProductById({ productId });
    if (!product) {
      return res.status(404).send('Product not found');
    }

    const result = await db_functions.deleteProduct(productId);
    if (result.deletedCount === 1) {
      res.send('Product deleted successfully');
    } else {
      res.status(500).send('Error deleting product');
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Error deleting product');
  }
}

module.exports = {
  addProductPage,
  addProductToDB,
  deleteProductPage,
  deleteProduct
}