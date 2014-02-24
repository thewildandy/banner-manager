'use strict';

angular.module('bannerManagerApp')
  .controller('BannerCtrl', function ($scope, $modal, $timeout, BannerService) {
    BannerService.getBanners().then(function (banners) {
      if(banners !== 'null')
        $scope.banners = banners;

      $timeout(function() {
        $('.banner-preview').cycle({
          centerHorz: true,
          centerVert: true
        });
      })
    });

    $scope.create = function() {
      var banner = {
        name: '',
        file: '',
        images: []
      };

      var modal = $modal.open({
        templateUrl: 'views/banner-modal.html',
        controller: 'BannerModalCtrl',
        resolve: {
          banner: function() {
            return banner;
          },
          identifier: function() {
            return -1;
          }
        }
      });
    }

    $scope.edit = function(identifier) {
      BannerService.getBanner(identifier).then(function (banner) {
        var modal = $modal.open({
            templateUrl: 'views/banner-modal.html',
            controller: 'BannerModalCtrl',
            resolve: {
              banner: function() {
                  return banner;
              },
              identifier: function() {
                return identifier;
              }
            }
        });
      });
    }

    $scope.$on('bannerCreated', function (event, identifier) {
      BannerService.getBanner(identifier).then(function (banner) {
        $scope.banners[identifier] = banner;
      });
    });

    $scope.$on('bannerUpdated', function (event, identifier, banner) {
      $scope.banners[identifier] = banner;
    });

    $scope.$on('bannerDeleted', function (event, identifier) {
      delete $scope.banners[identifier];
    });
  })

  .controller('BannerModalCtrl', function ($scope, $modalInstance, ImageService, BannerService, banner, identifier) {
    $scope.banner = banner;
    $scope.identifier = identifier;

    ImageService.getImages().then(function (images) {
      $scope.availableImages = images;
    });

    $scope.addImage = function(key) {
      if($scope.banner.images === undefined)
        $scope.banner.images = [];

      $scope.banner.images.push($scope.availableImages[key]);
    }

    $scope.removeImage = function(key) {
      $scope.banner.images.splice(key, 1);
    }

    $scope.save = function() {
      if(identifier == -1) {
        BannerService.createBanner($scope.banner).then(function () {
          $modalInstance.close();
        });  
      } else {
        BannerService.updateBanner(identifier, $scope.banner).then(function () {
          $modalInstance.close();
        });
      }
    }

    $scope.delete = function() {
      BannerService.deleteBanner(identifier).then(function () {
        $modalInstance.close();
      });
    }
  });