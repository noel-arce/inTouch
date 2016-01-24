'use strict';

/* USER Controllers */

angular.module('inTouch')
  .controller('ProfileCtrl', ['$scope', '$http', '$auth', 'Auth', function($scope, $http, $auth, Auth) {
    $http.get('/api/me').then(function(data) {
      $scope.user = data.data;
    });
  }]);