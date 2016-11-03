import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import _debug from 'debug';
import customerCreate from './controllers/customer-create';
import customerUpdate from './controllers/customer-update';
import catalogue from './controllers/catalogue';
import customerGet from './controllers/customer-get';

const debug = _debug('server');
dotenv.config({ silent: true });
/* eslint-disable */
const router = express.Router();
/* eslint-enable */

mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) {
    debug('mongodb connection error', err);
  } else {
    debug('mongodb connection successful');
  }
});

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/api/customer-location/:customerId', customerGet);
router.post('/api/customer', customerCreate);
router.put('/api/customer/:customerID', customerUpdate);
router.get('/api/catalogue/:locationID', catalogue);

export default router;
