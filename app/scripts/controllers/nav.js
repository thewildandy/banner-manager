'use strict';

angular.module('bannerManagerApp')
  .controller('NavCtrl', function ($scope, $route) {
    $scope.route = $route;
  });
