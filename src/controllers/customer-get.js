var customersModel = require('../models/customers.js');

module.exports = function (req, res, next) {
	customersModel.findById(req.params.customerId, function (err, data) {
		if (err || data === null)
			res.json({error: "There was a problem retrieving the customer information."});
		else {
			res.json({
				data: {
					locationID: data.locationID,
					basket: data.basket || {}
				},
				error: false
			});
		}
	});
}
