var rest = require('restler');
var debug = require('debug')('api-test');
var server = 'http://zidaroiu.com:8082';
var locations = ['LONDON', 'LIVERPOOL'];
var customerID = null;
var locationID = null;

describe('TV API', function() {
	this.timeout(5000);
	it('should create a customer', function(done) {
		locationID = locations[Date.now() % 2 === 0 ? 0 : 1];

		rest.post(server + '/api/customer',{
			data: {
				locationID: locationID
			}
		}).on('success', function(response) {
			debug('Returned Data: ', response);

			if (response.error === false) {
				customerID = response.data.customerID;
				done();
			}
		});
	});

	it('should get the locationID of a customer', function(done) {
		rest.get(server + '/api/customer-location/' + customerID).on('success', function(response) {
			debug('Returned Data: ', response);

			if (response.error === false) {
				locationID = response.data.locationID;
				done();
			}
		});
	});

	it('should get a list of products from the catalogue', function(done) {
		rest.get(server + '/api/catalogue/' + locationID).on('success', function(response) {
			debug('Returned Data: ', response);

			if (response.error === false)
				done();
		});
	});
});