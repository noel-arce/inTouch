'use strict';

/* MAIN Controller */

angular.module('inTouch')
  .controller('MainCtrl', ['$scope', '$rootScope', '$location', '$auth', '$http', function ($scope, $rootScope, $location, $auth, $http) {

    $scope.log = false;
    $scope.form = false;

    $scope.loginForm = function () {
      $scope.log = true;
    };

    $scope.signupForm = function () {
      $scope.log = false;
    };

    $scope.showHideForm = function() {
      if ($scope.form) {
        $scope.form = false;
      } else {
        $scope.form = true;
      }
    };

    // LOGIN/REGISTER
    $scope.user = {};

    $scope.isAuthenticated = function() {
      $http.get('/api/me').then(function (data) {
        if (!!data.data) {
          $scope.currentUser = data.data;
        } else {
          $auth.removeToken();
        }
      }, function (data) {
        $auth.removeToken();
        $location.path('/');
      });
    };

    $scope.isAuthenticated();

    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function(response) {
          $auth.setToken(response);
          $scope.isAuthenticated();
          $scope.user = {};
          $location.path('/contacts');
        })
        .catch(function(response) {
          console.log(response);
        });
    };

    $scope.login = function() {
      $auth.login($scope.user)
        .then(function(response) {
          $auth.setToken(response.data.token);
          $scope.isAuthenticated();
          $scope.user = {};
          $location.path('/contacts');
        })
        .catch(function(response) {
          console.log(response);
        });
    };

    $scope.logout = function() {
      $auth.logout()
        .then(function() {
          $auth.removeToken();
          $scope.currentUser = null;
          $location.path('/');
        });
    };
  }]);





