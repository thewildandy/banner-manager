'use strict';

angular.module('bannerManagerApp')
  .controller('BannerCtrl', function ($scope, $modal, BannerService, $firebase) {
    $scope.banners = BannerService.getBanners();

    $scope.create = function() {
        var banner = {
            id: -1,
            name: '',
            images: []
        };

        var modal = $modal.open({
            templateUrl: 'views/banner-modal.html',
            controller: 'BannerModalCtrl',
            resolve: {
                banner: function() {
                    return banner;
                }
            }
        });
    }

    $scope.edit = function(index) {
        BannerService.getBanner(index).then(function(banner) {
            var modal = $modal.open({
                templateUrl: 'views/banner-modal.html',
                controller: 'BannerModalCtrl',
                resolve: {
                    banner: function() {
                        return banner;
                    }
                }
            });
        });
    }
  })

  .controller('BannerModalCtrl', function($scope, $modalInstance, banner) {
    $scope.banner = banner;
  });