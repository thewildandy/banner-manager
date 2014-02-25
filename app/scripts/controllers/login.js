'use strict';

angular.module('bannerManagerApp')
  .controller('LoginCtrl', function ($scope, $location, AuthService, Alerts) {
  	$scope.login = function() {
      AuthService.login($scope.email, $scope.password).then(function (user) {
        if(user) {
          $location.path('/');
        } else {
        	Alerts.add(null, 'Uh oh, it doesn\'t look like your login details are correct!');
        }
      });
    }
  });