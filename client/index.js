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
		_this.list = [];

		$scope.orders = _this;

		_this.get = function() {
			$http.get('/api/top-orders').success(function (data) {
				_this.list = data.map(function (order) {
					order.orderId = order._id;
					delete order._id;
					return order;
				});
			});
		};

		_this.get();
	}])
	.controller('indexController', ["$cookies", "$scope", "$http", function ($cookies, $scope, $http) {
		let _this = this;
		let locations = ['LONDON', 'LIVERPOOL'];
		_this.list = [];
		$scope.products = _this;

		console.log($cookies);

		let customerID = $cookies.get('customerID');

		//create a new customer is the customerID is not set
		if (!customerID)
			$http.post('/api/customer', {
				locationID: locations[Date.now() % 2 === 0 ? 0 : 1]
			}).success(function (response) {
				if (response.error === false) {
					customerID = response.data.customerID;
					_this.getLocation();
				}
			});
		else
			_this.getLocation();


		_this.getLocation = function() {
			$http.get('/api/customer-location/' + customerID).success(function (response) {
				if (response.error === false) {
					locationID = response.data.locationID;
					$http.get('/api/catalogue/' + locationID).success(function (response) {
						if (response.error === false) {
							$scope.catalogue = response.data;
						}
					});
				}
			});
		};
	}])
	.run(['$rootScope', function($rootScope) {
		$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
			if (current.$$route)
				$rootScope.title = current.$$route.title;
		});
	}]);

if (!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}