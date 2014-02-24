'use strict';

angular.module('bannerManagerApp')
  .factory('AuthService', function ($q, $interval, $rootScope) {
    var url = 'https://twa.firebaseio.com';
    var firebase = new Firebase(url);

    var authServiceHasResponded = false;
    var response = null;

    var auth = new FirebaseSimpleLogin(firebase, function (err, user) {
      authServiceHasResponded = true;
      response = user;
    });

    function __check() {
      var d = $q.defer();

      var wait = $interval(function() {
        if(authServiceHasResponded) {
          d.resolve(response ? true : false);
        }
      });

      return d.promise;
    }

    function __login(email, password) {
      authServiceHasResponded = false;
      response = null;

      var d = $q.defer();

      auth.login('password', {
        email: email,
        password: password
      })

      var wait = $interval(function() {
        if(authServiceHasResponded) {
          d.resolve(response);
        }
      });

      return d.promise;
    }

    return {
      check: __check,
      login: function (email, password) {
        return __login(email, password);
      }
    }
  });
