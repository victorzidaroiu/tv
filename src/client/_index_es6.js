/*global $ */
/*
angular.module('tvApp', ['ngRoute', 'ngCookies'])
  .config(['$routeProvider', ($routeProvider) => {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/index.html',
        controller: 'indexController',
        title: 'Product selection',
      })
      .when('/checkout', {
        templateUrl: 'partials/checkout.html',
        controller: 'checkoutController',
        title: 'Product checkout',
      }).
      otherwise({
        redirectTo: '/',
      });
  }])
  .controller('checkoutController', ['$timeout', '$cookies', '$scope', '$http', ($timeout, $cookies, $scope, $http) => {
    let _this = this;
    _this.basket = {};
    _this.catalogue = [];

    $scope.products = _this;

    _this.customerID = $cookies.get('customerID');
    _this.locationID = null;

    _this.openAddModal = () => {
      $('#orderConfirmModal').modal('show');
    };

    _this.getLocation = () => {
      $http.get('/api/customer-location/' + _this.customerID).success((response) => {
        if (response.error === false) {
          _this.locationID = response.data.locationID;
          _this.basket = response.data.basket;
          $http.get('/api/catalogue/' + _this.locationID).success((response) => {
            if (response.error === false) {
              _this.catalogue = response.data;
              for (let productID in _this.catalogue) {
                if (_this.basket[productID] !== undefined) {
                    _this.catalogue[productID].isInBasket = true;
                }
                else {
                    _this.catalogue[productID].isInBasket = false;
                }
              }
              $timeout(() => {
                $('.ui.checkbox').checkbox({
                  onChange: _this.updateBasket
                });
              }, 0, false);
            }
          });
        }
      });
    };

    _this.updateBasket = () => {
      _this.basket = {};
      $('input:checked').each(() => {
        _this.basket[$(this).data('id')] = true;
      });
      $http.put('/api/customer/' + _this.customerID, {
        basket: _this.basket,
      });
      $scope.$apply();
    };

    //create a new customer is the customerID is not set
    if (!_this.customerID)
      $http.post('/api/customer', {
        locationID: locations[Date.now() % 2 === 0 ? 0 : 1],
        basket: {}
      }).success((response) => {
        if (response.error === false) {
          _this.customerID = response.data.customerID;
          $cookies.put('customerID', _this.customerID);
          _this.getLocation();
        }
      });
    else
      _this.getLocation();
  }])
  .controller('indexController', ['$timeout', '$cookies', '$scope', '$http', '$log', ($timeout, $cookies, $scope, $http, $log) => {
    let _this = this;
    let locations = ['LONDON', 'LIVERPOOL'];
    _this.basket = {};
    _this.catalogue = [];
    $scope.products = _this;
    $scope.$log = $log;
    _this.basketSize = 0;

    _this.customerID = $cookies.get('customerID');
    _this.locationID = null;

    _this.getLocation = () => {
      $http.get('/api/customer-location/' + _this.customerID).success((response) =>{
        if (response.error === false) {
          _this.locationID = response.data.locationID;
          _this.basket = response.data.basket;
          $http.get('/api/catalogue/' + _this.locationID).success((response) => {
            if (response.error === false) {
              _this.catalogue = response.data;
              for (const productID in _this.catalogue) {
                if (_this.basket[productID] !== undefined) {
                  _this.catalogue[productID].isInBasket = true;
                }
                else {
                  _this.catalogue[productID].isInBasket = false;
                }
              }
              _this.basketSize = Object.keys(_this.basket).length;
              $timeout(() => {
                $('.ui.checkbox').checkbox({
                  onChange: _this.updateBasket
                });
              }, 0, false);
            }
          });
        }
        else {
          _this.createCustomerID();
        }
      });
    };

    _this.updateBasket = () => {
      _this.basket = {};
      $('input:checked').each(() => {
        _this.basket[$(this).data('id')] = true;
      });
      $http.put(`/api/customer/${_this.customerID}`, {
        basket: _this.basket,
      });
      _this.basketSize = Object.keys(_this.basket).length;
      $scope.$apply();
    };

    _this.createCustomerID = () => {
      $http.post('/api/customer', {
        locationID: locations[Date.now() % 2 === 0 ? 0 : 1],
        basket: { },
      }).success((response) => {
        if (response.error === false) {
          _this.customerID = response.data.customerID;
          $cookies.put('customerID', _this.customerID);
          _this.getLocation();
        }
      });
    };

    //create a new customer if the customerID is not set
    if (!_this.customerID) {
      _this.createCustomerID();
    }
    else {
      _this.getLocation();
    }
  }])
  .run(['$rootScope', ($rootScope) => {
    $rootScope.$on('$routeChangeSuccess', (event, current) => {
      if (current.$$route) {
        $rootScope.title = current.$$route.title;
      }
    });
  }]);

if (String.prototype.trim === undefined) {
  String.prototype.trim = () => this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
}
*/
