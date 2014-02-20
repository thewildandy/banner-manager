'use strict';

angular.module('bannerManagerApp')
  .factory('BannerService', function ($firebase, $http) {
  	var firebaseUrl = 'https://twa.firebaseio.com/banner-manager';
  	var banners = new Firebase(firebaseUrl + '/banners');
    return {
    	getBanners: function() {
    		return $firebase(banners);
    	},
    	getBanner: function(index) {
    		var ref = $firebase(banners);
    		var keys = ref.$getIndex();

    		return $http.get(firebaseUrl + '/banners/' + keys[index] + '.json').then(function(response) {
    			return response.data;
    		});
    	}
    };
  });
