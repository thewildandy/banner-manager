'use strict';

angular.module('bannerManagerApp')
  .controller('ImageCtrl', function ($scope, $modal, Images, Alerts, md5) {
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

    var timestamp = new Date().getTime();

    $('#uploadify').uploadify({
      'formData': {
        'timestamp': timestamp,
        'token': md5.createHash('SECRET' + timestamp)
      },
      'swf': 'bower_components/uploadify/uploadify.swf',
      'uploader': 'upload.php',
      'height': 34,
      'buttonClass': 'btn btn-primary pull-right',
      'buttonText': 'Add Image <i class="glyphicon glyphicon-picture"></i>',
      'onUploadSuccess': function(file, data, response) {
        // Notifications.addAlert('success', '<b>Success!</b> Your file <code>' + file.name + '</code> has been uploaded.');
        Images.add({
          file: file.name
        });
      },
      'onUploadError': function(file, errorCode, errorMsg, errorString) {
        Alerts.add('danger', '<b>Error!</b> Your file <code>' + file.name + '</code> was rejected.');
      }
    });
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
