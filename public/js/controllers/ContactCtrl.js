'use strict';

angular.module('inTouch')
	.controller('ContactCtrl', ['$scope', '$location', '$http', 'Auth', function ($scope, $location, $http, Auth) {

		$scope.edit = false;

		$scope.$watch('edit', function(){
		  $scope.editText = $scope.edit ? 'DONE' : 'EDIT';
		});

		//GET ALL CONTACTS
		$http.get('/api/contacts') 
		  .success(function (response) {
		    $scope.contacts = response;
		    // console.log($scope.contacts);
		  })
		  .error(function (response) {
		    console.log(response);
		 });

		// NEW Contact
		$scope.contacts = [];
		$scope.contact = {};

		// CREATE A New Contact   
		$scope.createContact = function(contact) {
		  var daysToMilli = $scope.contact.days*60*1000;
		  var currentDate = Date.now();
		  var deadline = daysToMilli + currentDate;
		  $http.post('/api/contacts', { name: $scope.contact.name, days: $scope.contact.days, deadline: deadline, creator: $scope.currentUser._id })
		    .success(function (response) {
		    	$scope.contacts.push(response);
		    	$scope.contact = null;
		    }).error(function (error) {
		      console.log("This is an error:", error);
		    });      
		};

		// EDIT A POST
		$scope.editContact = function(contact) {
		  $http.put('api/contacts/' + contact._id, contact)
		    .success(function (response){
		      $scope.resetTimer(contact);
		      $scope.editForm = false;
		    }).error(function (error){
		      console.log(error);
		    });
		};

		// DELETE A CONTACT
		$scope.deleteContact = function(contact) {
		  var contactIndex = ($scope.contacts.indexOf(contact));
		  $http.delete('api/contacts/' + contact._id)
		    .success(function (response) {
		      $scope.contacts.splice(contactIndex, 1);
		    })
		    .error(function (error) {
		      console.log(error);
		    });
		};

		// RESET TIMER
		$scope.resetTimer = function(contact) {
		  var daysToMilli = contact.days*60*1000;
		  var deadline = daysToMilli + Date.now();
		  contact.deadline = deadline;
		  contact.time_left = true;
		  $http.put('api/contacts/' + contact._id, contact)
		    .success(function (response){
		    	$scope.$broadcast('timer-start');
		    }).error(function (error){
		      console.log(error);
		    });
		};

		// DEADLINE COLOR CHANGE
		$scope.turnRed = function (contact) {
		  contact.time_left = false;
		  $http.put('api/contacts/' + contact._id, contact) 
		    .success(function (response){
		    }).error(function (error){
		      console.log(error);
		    });
		};

}]);





