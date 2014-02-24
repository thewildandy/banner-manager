'use strict';

angular.module('bannerManagerApp', [
  'firebase',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
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
  .run(function ($rootScope, $location, $cookies) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      // Return early if the destination is the login route
      if(next.name == 'login')
        return;

      // Redirect unauthenticated users to the login page
      if(!$cookies.user)
        $location.path('/login');
    });
  });
