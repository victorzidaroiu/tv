var productsModel = require('../models/products.js');
module.exports = function (req, res, next) {
	productsModel.find({
		$or: [
			{ locationID: req.params.locationID },
			{ locationID: '' }
		]
	}, function (err, data) {
		if (err)
			res.json({error: "There was a problem retrieving products from the catalogue."});
		else {
			var catalogue = { };
			data.forEach(function(product){
				product = product.toObject();
				catalogue[product._id] = product;
				delete product._id;
				delete product.__v;
			});
			res.json({
				data: catalogue,
				error: false
			});
		}
	});
}
