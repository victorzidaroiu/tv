var customersModel = require('../models/customers.js');

module.exports = function (req, res, next) {
	customersModel.findByIdAndUpdate(req.params.customerID, req.body, function (err, data) {
		if (err)
			res.json({error: "There was a problem updating customer."});
		res.json({
			error: false
		});
	});
}
