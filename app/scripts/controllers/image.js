'use strict';

angular.module('bannerManagerApp')
  .controller('ImageCtrl', function ($scope, ImageService) {
    $scope.images = ImageService.getImages();

    $scope.edit = function(index) {
    	ImageService.getImage(index).then(function(image) {
    		console.log(image);
    	});
    }
  });
