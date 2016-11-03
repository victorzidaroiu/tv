import customersModel from '../models/customers';

export default (req, res) => {
  customersModel.findById(req.params.customerId, (err, data) => {
    if (err || data === null) {
      res.json({ error: 'There was a problem retrieving the customer information.' });
    } else {
      res.json({
        data: {
          locationID: data.locationID,
          basket: data.basket || {},
        },
        error: false,
      });
    }
  });
};
