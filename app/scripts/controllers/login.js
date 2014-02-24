'use strict';

angular.module('bannerManagerApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, AuthService) {
  	$scope.login = function() {
      AuthService.login($scope.email, $scope.password).then(function (user) {
        if(user) {
          $location.path('/');
        }
      });
    }
  });