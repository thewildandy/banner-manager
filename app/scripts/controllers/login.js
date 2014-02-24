'use strict';

angular.module('bannerManagerApp')
  .controller('LoginCtrl', function ($scope, $rootScope, $location, $cookies) {
  	// Return if already authenticated.
  	// Note: This fires much faster than the redirect below
  	if($cookies.user) $location.path('/');

  	var auth = new FirebaseSimpleLogin(new Firebase('https://twa.firebaseio.com'), function (err, user) {
  		if(user) {
				$location.path('/');
				$cookies.user = user.email;
  			$rootScope.user = user.email;
  			$rootScope.$apply();
  		}
  	});
  	
  	$scope.login = function () {
    	auth.login('password', {
    		email: $scope.email,
    		password: $scope.password
    	});
    }
  });