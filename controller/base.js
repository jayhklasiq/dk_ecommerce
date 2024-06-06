function homepage(req, res, next) {
  res.render('index', {
    title: 'Homepage'
  });
}

function shoppage(req, res, next) {
  res.render('pages/shop', {
    title: 'Shop'
  });
}

function aboutuspage(req, res, next) {
  res.render('pages/about-us', {
    title: 'About Us'
  });
}

function cartview(req, res, next) {
  res.render('pages/shoppingcart', {
    title: 'Shopping Cart'
  });
}

module.exports = {
  homepage,
  shoppage,
  aboutuspage,
  cartview
}
