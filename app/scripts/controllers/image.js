'use strict';

angular.module('bannerManagerApp')
  .controller('ImageCtrl', function ($scope, $modal, Images) {
    $scope.images = Images.get();

    $scope.edit = function(key) {
      $modal.open({
        templateUrl: 'views/image-modal.html',
        controller: 'ImageModalCtrl',
        resolve: {
          key: function() {
            return key;
          }
        }
      });
    }
  })

  .controller('ImageModalCtrl', function ($scope, $modalInstance, Images, key) {
    $scope.image = Images.get(key);

    $scope.save = function() {
      Images.update($scope.image);
      $modalInstance.close();
    }

    $scope.delete = function() {
      Images.delete(key);
      $modalInstance.close();
    }
  });
