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
      .otherwise({
        redirectTo: '/banners'
      });
  });
