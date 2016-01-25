'use strict';

/* Services */

angular.module('basic-auth.services', [])

  .factory('Auth', ['$auth', function ($auth) {
    return {
      currentUser: function() {
        var user = $auth.getPayload();
        var currentUser = {
          _id: user.sub,
          username: user.username,
          email: user.email
        };
        return currentUser;
      }
    };
  }]);