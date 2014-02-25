'use strict';

angular.module('bannerManagerApp')
  .factory('Alerts', function () {
    var alerts = [];

    return {
      add: function(type, message) {
        alerts.push({
          type: type,
          msg: message
        });
      },
      get: function() {
        return alerts;
      }
    };
  });
