'use strict';

angular.module('bannerManagerApp')
  .factory('ImageService', function ($rootScope, $firebase, $http) {
  	var firebaseUrl = 'https://twa.firebaseio.com/banner-manager';
  	var images = new Firebase(firebaseUrl + '/images');
    return {
    	getImages: function() {
    		return $http.get(firebaseUrl + '/images.json').then(function(response) {
          return response.data;
        });
    	},
      getImage: function(identifier) {
        return $http.get(firebaseUrl + '/images/' + identifier + '.json').then(function(response) {
          return response.data;
        });
      },
      updateImage: function(identifier, data) {
        return $http.put(firebaseUrl + '/images/' + identifier + '.json', data).then(function(response) {
          $rootScope.$broadcast('imageUpdated', identifier, response.data);
        });
      },
      deleteImage: function(identifier) {
        return $http.delete(firebaseUrl + '/images/' + identifier + '.json').then(function(response) {
          $rootScope.$broadcast('imageDeleted', identifier);
        });
      }
    };
  });
