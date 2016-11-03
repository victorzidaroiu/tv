import productsModel from '../models/products';

export default (req, res) => {
  productsModel.find({
    $or: [
      { locationID: req.params.locationID },
      { locationID: '' },
    ],
  }, (err, data) => {
    if (err) {
      res.json({ error: 'There was a problem retrieving products from the catalogue.' });
    } else {
      const catalogue = { };
      /* eslint-disable */
      data.forEach((product) => {
        product = product.toObject();
        catalogue[product._id] = product;
        delete product._id;
        delete product.__v;
      });
      /* eslint-enable */
      res.json({
        data: catalogue,
        error: false,
      });
    }
  });
};
