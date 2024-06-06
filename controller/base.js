function homepage(req, res, next) {
  res.render('index',
    {
      title: 'Homepage'
    }
  )
}

module.exports = {
  homepage
}