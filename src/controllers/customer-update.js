import customersModel from '../models/customers.js';

export default (req, res, next) => {
	customersModel.findByIdAndUpdate(req.params.customerID, req.body, (err, data) => {
		if (err) {
			res.json({error: "There was a problem updating customer."});
		} else {
			res.json({
				error: false
			});
		}
	});
}
