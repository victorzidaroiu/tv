var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	locationID: String
});

module.exports = mongoose.model('Customers', schema);