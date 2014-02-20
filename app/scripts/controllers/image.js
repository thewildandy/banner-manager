'use strict';

angular.module('bannerManagerApp')
  .controller('ImageCtrl', function ($scope, $modal, ImageService) {
    ImageService.getImages().then(function(images) {
      $scope.images = images;
    });

    $scope.$on('imageUpdated', function (event, identifier, image) {
      $scope.images[identifier] = image;
    })

    $scope.$on('imageDeleted', function (event, identifier) {
      delete $scope.images[identifier];
    });

    $scope.edit = function(identifier) {
      ImageService.getImage(identifier).then(function(image) {
        $modal.open({
          templateUrl: 'views/image-modal.html',
          controller: 'ImageModalCtrl',
          resolve: {
            image: function() {
              return image;
            },
            identifier: function() {
              return identifier;
            }
          }
        });
      });
    }
  })

  .controller('ImageModalCtrl', function ($scope, $rootScope, $modalInstance, ImageService, image, identifier) {
    $scope.image = image;

    $scope.save = function() {
      ImageService.updateImage(identifier, $scope.image).then(function(image) {
        $modalInstance.close();
      });
    }

    $scope.delete = function() {
      ImageService.deleteImage(identifier).then(function() {
        $modalInstance.close();
      });
    }
  });
