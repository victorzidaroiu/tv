angular.module('tvApp', ['ngRoute', 'ngCookies'])
	.config(['$routeProvider',
		function ($routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'partials/index.html',
					controller: 'indexController',
					title: 'Product selection'
				})
				.when('/checkout', {
					templateUrl: 'partials/checkout.html',
					controller: 'checkoutController',
					title: 'Product checkout'
				}).
				otherwise({
					redirectTo: '/'
				});
		}])
	.controller('checkoutController', ["$cookies", "$scope", "$http", function ($cookies, $scope, $http) {
		let _this = this;
		_this.basket = [];

		$scope.orders = _this;

		_this.get = function() {
			$http.get('/api/top-orders').success(function (data) {
				_this.basket = data.map(function (order) {
					order.orderId = order._id;
					delete order._id;
					return order;
				});
			});
		};

		_this.get();
	}])
	.controller('indexController', ['$timeout', "$cookies", "$scope", "$http", "$log", function ($timeout, $cookies, $scope, $http, $log) {
		let _this = this;
		let locations = ['LONDON', 'LIVERPOOL'];
		_this.basket = [];
		_this.catalogue = [];
		$scope.products = _this;
		$scope.$log = $log;

		_this.customerID = $cookies.get('customerID');
		_this.locationID = null;

		_this.getLocation = function() {
			$http.get('/api/customer-location/' + _this.customerID).success(function (response) {
				if (response.error === false) {
					_this.locationID = response.data.locationID;
					$http.get('/api/catalogue/' + _this.locationID).success(function (response) {
						if (response.error === false) {
							_this.catalogue = response.data;
							$timeout(function () {
								$('.ui.checkbox').checkbox({
									onChange: _this.updateBasket
								});
							}, 0, false);
						}
					});
				}
			});
		};

		_this.updateBasket = function() {
			_this.basket = [];
			$('input:checked').each(function() {
				_this.basket.push({
					productID: $(this).data('productID'),
					name: $(this).data('name')
				});
			});
			$http.put('/api/customer/', {
				basket: _this.basket.map(function(basketItem){
					return basketItem.productID;
				})
			});
			$scope.$apply();
		};

		//create a new customer is the customerID is not set
		if (!_this.customerID)
			$http.post('/api/customer', {
				locationID: locations[Date.now() % 2 === 0 ? 0 : 1]
			}).success(function (response) {
				if (response.error === false) {
					_this.customerID = response.data.customerID;
					$cookies.put('customerID', _this.customerID);
					_this.getLocation();
				}
			});
		else
			_this.getLocation();
	}])
	.run(['$rootScope', function($rootScope) {
		$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
			if (current.$$route)
				$rootScope.title = current.$$route.title;
		});
	}])

if (!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}