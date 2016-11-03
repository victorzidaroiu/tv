import customersModel from '../models/customers';

export default (req, res) => {
  customersModel.create(req.body, (err, response) => {
    if (err) {
      res.json({ error: 'There was a problem creating a new customer.' });
    } else {
      const data = response.toObject();
      /* eslint-disable */
      data.customerID = data._id;
      delete data._id;
      delete data.__v;
      /* eslint-enable */
      res.json({
        data,
        error: false,
      });
    }
  });
};
