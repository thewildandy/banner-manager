'use strict';

angular.module('bannerManagerApp')
  .factory('BannerService', function ($rootScope, $firebase, $http) {
  	var firebaseUrl = 'https://twa.firebaseio.com/banner-manager';
  	var banners = new Firebase(firebaseUrl + '/banners');
    return {
      createBanner: function(data) {
        return $http.post(firebaseUrl + '/banners.json', data).then(function(response) {
          return response.data;
        });
      },
    	getBanners: function() {
    		return $firebase(banners);
    	},
    	getBanner: function(identifier) {
    		return $http.get(firebaseUrl + '/banners/' + identifier + '.json').then(function(response) {
    			return response.data;
    		});
    	},
      updateBanner: function(identifier, data) {
        return $http.put(firebaseUrl + '/banners/' + identifier + '.json', data).then(function(response) {
          $rootScope.$broadcast('bannerUpdated', identifier, response.data);
        });
      },
      deleteBanner: function(identifier) {
        return $http.delete(firebaseUrl + '/banners/' + identifier + '.json').then(function (response) {
          $rootScope.$broadcast('bannerDeleted', identifier);
        });
      }
    };
  });
