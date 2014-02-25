'use strict';

angular.module('bannerManagerApp')
  .controller('BannerCtrl', function ($scope, $modal, $timeout, Banners) {
    $scope.banners = Banners.get();

    $scope.banners.$on('loaded', function() {
      $('.banner-preview').cycle({
        centerHorz: true,
        centerVert: true
      });
    });

    $scope.create = function() {
      var modal = $modal.open({
        templateUrl: 'views/banner-modal.html',
        controller: 'BannerModalCtrl',
        resolve: {
          key: function() {
            return null;
          }
        }
      });
    }

    $scope.edit = function(key) {
      var modal = $modal.open({
          templateUrl: 'views/banner-modal.html',
          controller: 'BannerModalCtrl',
          resolve: {
            key: function() {
              return key;
            }
          }
      });
    }
  })

  .controller('BannerModalCtrl', function ($scope, $modalInstance, Images, Banners, key) {
    if(key) {
      $scope.banner = Banners.get(key);
    } else {
      $scope.banner = {
        images: []
      };
    }

    $scope.availableImages = Images.get();

    $scope.addImage = function(key) {
      $scope.banner.images.push($scope.availableImages[key]);
    }

    $scope.removeImage = function(key) {
      $scope.banner.images.splice(key, 1);
    }

    $scope.save = function() {
      if(key) {
        Banners.update($scope.banner);
      } else {
        Banners.add($scope.banner);
      }
      $modalInstance.close();
    }

    $scope.delete = function() {
      Banners.delete(key);
      $modalInstance.close();
    }
  });