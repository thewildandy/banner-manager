'use strict';

angular.module('bannerManagerApp')
  .controller('AlertCtrl', function ($scope, Alerts) {
    $scope.alerts = Alerts.get();

    $scope.close = function(index) {
      $scope.alerts.splice(index, 1);
    }
  });