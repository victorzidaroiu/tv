var customersModel = require('../models/customers.js');

module.exports = function (req, res, next) {
	customersModel.create(req.body, function (err, data) {
		if (err)
			res.json({error: "There was a problem creating a new customer."});
		else {
			data = data.toObject();
			data.customerID = data._id;
			delete data._id;
			delete data.__v;
			res.json({
				data: data,
				error: false
			});
		}
	});
}
