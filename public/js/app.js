'use strict';

// Declare app level module which depends on filters, and services
angular.module('bonzai', ['basic-auth.services',
                              'ngRoute',
                              'ngResource',
                              'satellizer',
                              'timer'])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'templates/splash'
      }),

      $routeProvider.when("/networks", {
        templateUrl: "templates/network-index",
        controller: "NetworkCtrl"
      }),

      $routeProvider.when('/profile', {
        templateUrl: 'templates/profile',
        controller: 'ProfileCtrl'
      })

      $routeProvider.otherwise({redirectTo: '/'});

      $locationProvider.html5Mode(true);
    }]);
