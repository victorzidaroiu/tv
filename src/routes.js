import express from 'express';
import mongoose from 'mongoose';
import customerCreate from './controllers/customer-create.js';
import customerUpdate from './controllers/customer-update.js';
import catalogue from './controllers/catalogue.js';
import customerGet from './controllers/customer-get.js';
import dotenvModule from 'dotenv';

const dotenv = dotenvModule.config({ silent: true });
const router = express.Router();

mongoose.connect(process.env.MONGODB_URI, function(err) {
  if(err) {
    console.log('mongodb connection error', err);
  } else {
    console.log('mongodb connection successful');
  }
});

router.get('/', function (req, res, next) {
	res.render('index');
});

router.get('/api/customer-location/:customerId', customerGet);
router.post('/api/customer', customerCreate);
router.put('/api/customer/:customerID', customerUpdate);
router.get('/api/catalogue/:locationID', catalogue);

export default router;
