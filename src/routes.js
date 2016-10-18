var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var customerCreate = require('./controllers/customer-create.js');
var customerUpdate = require('./controllers/customer-update.js');
var catalogue = require('./controllers/catalogue.js');
var customerGet = require('./controllers/customer-get.js');
var debug = require('debug')('API');

router.get('/', function (req, res, next) {
	res.render('index');
});

router.get('/api/customer-location/:customerId', customerGet);
router.post('/api/customer', customerCreate);
router.put('/api/customer/:customerID', customerUpdate);
router.get('/api/catalogue/:locationID', catalogue);

module.exports = router;
