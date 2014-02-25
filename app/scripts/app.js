'use strict';

angular.module('bannerManagerApp', [
  'angular-md5',
  'firebase',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/banners', {
        name: 'banners',
        templateUrl: 'views/banners.html',
        controller: 'BannerCtrl'
      })
      .when('/images', {
        name: 'images',
        templateUrl: 'views/images.html',
        controller: 'ImageCtrl'
      })
      .when('/login', {
        name: 'login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/banners'
      });
  })
  .run(function ($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      // Return early if the destination is the login route
      if(next.name == 'login') {
        return;
      }

      // Wait for authentication, then ...
      AuthService.check().then(function (authenticated) {
        if(!authenticated)
          $location.path('/login'); // Redirect to login
      });
    });
  });
