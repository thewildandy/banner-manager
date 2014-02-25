'use strict';

angular.module('bannerManagerApp')
  .factory('Images', function ($firebase) {
  	var firebaseUrl = 'https://twa.firebaseio.com/banner-manager';
  	var images = $firebase(new Firebase(firebaseUrl + '/images'));

    return {
      add: function(data) {
        images.$add(data);
      },
      get: function(key) {
        if(key !== undefined) {
          return images.$child(key);
        } else {
          return images;
        }
      },
      update: function(image) {
        image.$save();
      },
      delete: function(key) {
        images.$remove(key);
      }
    };
  });
