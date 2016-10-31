import customersModel from '../models/customers.js';

export default (req, res, next) => {
	customersModel.findById(req.params.customerId, (err, data) => {
		if (err || data === null) {
			res.json({error: "There was a problem retrieving the customer information."});
		} else {
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
