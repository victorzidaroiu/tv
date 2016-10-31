import productsModel from '../models/products.js';

export default (req, res, next) => {
	productsModel.find({
		$or: [
			{ locationID: req.params.locationID },
			{ locationID: '' }
		]
	}, function (err, data) {
		if (err) {
			res.json({error: "There was a problem retrieving products from the catalogue."});
		} else {
			const catalogue = { };
			data.forEach(product => {
				product = product.toObject();
				catalogue[product._id] = product;
				delete product._id;
				delete product.__v;
			}),
			res.json({
				data: catalogue,
				error: false
			});
		}
	});
}
