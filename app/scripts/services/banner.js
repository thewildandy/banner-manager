'use strict';

angular.module('bannerManagerApp')
  .factory('Banners', function ($firebase) {
    var firebaseUrl = 'https://twa.firebaseio.com/banner-manager';
    var banners = $firebase(new Firebase(firebaseUrl + '/banners'));
    
    return {
      add: function(data) {
        banners.$add(data);
      },
      get: function(key) {
        if(key !== undefined) {
          return banners.$child(key);
        } else {
          return banners;
        }
      },
      update: function(banner) {
        banner.$save();
      },
      delete: function(key) {
        banners.$remove(key);
      }
    };
  });
