import customersModel from '../models/customers';

export default (req, res) => {
  customersModel.findByIdAndUpdate(req.params.customerID, req.body, (err) => {
    if (err) {
      res.json({ error: 'There was a problem updating customer.' });
    } else {
      res.json({
        error: false,
      });
    }
  });
};
