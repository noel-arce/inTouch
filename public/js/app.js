'use strict';

// Declare app level module which depends on filters, and services
angular.module('inTouch', ['basic-auth.services',
                           'ngAnimate',
                           'ngRoute',
                           'ngResource',
                           'satellizer',
                           'timer'])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
      $routeProvider.when('/', {
        templateUrl: 'templates/splash'
      }),

      $routeProvider.when("/contacts", {
        templateUrl: "templates/contacts",
        controller: "ContactCtrl"
      }),

      $routeProvider.when('/profile', {
        templateUrl: 'templates/profile',
        controller: 'ProfileCtrl'
      })

      $routeProvider.otherwise({redirectTo: '/'});

      $locationProvider.html5Mode(true);
    }]);
