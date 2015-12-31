var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var productsModel = require('../models/products.js');
var customersModel = require('../models/customers.js');
var debug = require('debug')('API');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index');
});

/* REST API */
router.get('/api/customer-location/:customerId', function (req, res, next) {
	customersModel.findById(req.params.customerId, function (err, data) {
		if (err)
			res.json({error: "There was a problem retrieving the customer information."});
		else {
			//data = data.toObject();
			//delete data._id;
			//delete data.__v;
			res.json({
				data: {
					locationID: data.locationID,
					basket: data.basket || {}
				},
				error: false
			});
		}
	});
});

router.post('/api/customer', function (req, res, next) {
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
});

router.put('/api/customer/:customerID', function (req, res, next) {
	customersModel.findByIdAndUpdate(req.params.customerID, req.body, function (err, data) {
		if (err)
			res.json({error: "There was a problem updating customer."});
		res.json({
			error: false
		});
	});
});

router.get('/api/catalogue/:locationID', function (req, res, next) {
	productsModel.find({
		$or: [
			{locationID: req.params.locationID},
			{locationID: ''}
		]
	}, function (err, data) {
		if (err)
			res.json({error: "There was a problem retrieving products from the catalogue."});
		else {
			var catalogue = {};
			data.forEach(function(product){
				product = product.toObject();
				catalogue[product._id] = product;
				delete product._id;
				delete product.__v;
			});
			res.json({
				data: catalogue,
				error: false
			});
		}
	});
});

module.exports = router;
