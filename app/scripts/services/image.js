'use strict';

angular.module('bannerManagerApp')
  .factory('ImageService', function ($firebase, $http) {
  	var firebaseUrl = 'https://twa.firebaseio.com/banner-manager';
  	var images = new Firebase(firebaseUrl + '/images');
    return {
    	getImages: function() {
    		return $firebase(images);
    	},
      getImage: function(index) {
        console.log(index);
        var ref = $firebase(images);
        var keys = ref.$getIndex();

        return $http.get(firebaseUrl + '/images/' + keys[index] + '.json').then(function(response) {
          return response.data;
        });
      }
    };
  });
