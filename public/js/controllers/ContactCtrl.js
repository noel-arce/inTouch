'use strict';

angular.module('inTouch')
	.controller('ContactCtrl', ['$scope', '$location', '$http', 'Auth', function ($scope, $location, $http, Auth) {

		$scope.edit = false;

		$scope.$watch('edit', function(){
		  $scope.editText = $scope.edit ? 'DONE' : 'EDIT';
		});

		//GET ALL CONTACTS
		$http.get('/api/contacts') 
		  .success(function(response) {
		    $scope.contacts = response;
		    // console.log($scope.contacts);
		  })
		  .error(function(response) {
		    console.log(response);
		 });

		// NEW Contact
		$scope.contacts = [];
		$scope.contact = {};

		// CREATE A New Contact   
		$scope.createContact = function(contact) {
			console.log(contact);
		  var daysToMilli = $scope.contact.days*60*1000;
		  var currentDate = Date.now();
		  var deadline = daysToMilli + currentDate;
		  $http.post('/api/contacts', { name: $scope.contact.name, days: $scope.contact.days, deadline: deadline, creator: $scope.currentUser._id })
		    .success(function (response) {
		    	console.log("This is the response from the server", response);
		    	$scope.contacts.push(response);
		    	$scope.contact = null;
		    }).error(function (error) {
		      console.log("This is an error:", error);
		    });      
		};

		// EDIT A POST
		$scope.editContact = function(contact) {
			console.log("this contact was edited: ", contact);
		  $http.put('api/contacts/' + contact._id, contact)
		    .success(function(response){
		      console.log("contact info from server: ", response);
		      $scope.resetTimer(contact);
		      $scope.editForm = false;
		    }).error(function (error){
		      console.log(error);
		    });
		};

		// DELETE A CONTACT
		$scope.deleteContact = function(contact) {
			console.log("this contact was deleted: ", contact);
		  var contactIndex = ($scope.contacts.indexOf(contact));
		  $http.delete('api/contacts/' + contact._id)
		    .success(function (response) {
		    	console.log("this is the server response: ", response);
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
		    .success(function(response){
		    	$scope.$broadcast('timer-start');
		      // console.log(response);
		    }).error(function(error){
		      console.log(error);
		    });
		};

		// DEADLINE COLOR CHANGE
		$scope.turnRed = function (contact) {
		  contact.time_left = false;
		  $http.put('api/contacts/' + contact._id, contact) 
		    .success(function(response){
		    }).error(function(error){
		      console.log(error);
		    });
		};

}]);
		//NETWORK
		// $scope.currentUser = Auth.currentUser();

		//Get all user networks
		// $http.get('/api/me')
		//   .success(function(response) {
		//     $scope.user = response;
		//     // console.log($scope.networks);
		// 		$scope.currentNetwork = $scope.user.networks[0];
		// 		// console.log(response);
		//   })
		//   .error(function(response) {
		//     console.log(response);
		//  });

		//SETS CURRENT NETWORK
		// $scope.setCurrentNetwork = function (network){
		// 	$scope.currentNetwork = network;
		// 	return $scope.currentNetwork !== null && network.title === $scope.currentNetwork.title;
		// };

		// CREATES NETWORK    
		// $scope.createNetwork = function(network) {
		//   $http.post('/api/networks', { title: $scope.network.title, user_id: $scope.currentUser._id })
		//     .success(function (response) {
		//       console.log(response);
		//       $scope.user.networks.push(response);
		//       $scope.network = null;
		//       $scope.currentNetwork = $scope.user.networks[$scope.user.networks.length-1];
		//     }).error(function (error) {
		//       console.log("This is an error:", error);
		//     });      
		// };

		// DELETES NETWORK
		// $scope.deleteNetwork = function (network){
		// 	var networkIndex = ($scope.user.networks.indexOf(network));
		// 	$http.delete('/api/networks/' + network._id)
		// 		.success(function(response){
		// 			$scope.user.networks.splice(networkIndex, 1);
		// 			if ($scope.user.networks[0] !== undefined) {
		// 				$scope.setCurrentNetwork($scope.user.networks[0]);
		// 				console.log($scope.currentNetwork);
		// 			} else {
		// 				$scope.currentNetwork = null;
		// 			}
		// 		}).error(function(error){
		// 			console.log("This is an error:", error);
		// 		});
		// };
		

		// $scope.editing = false;
		// $scope.newContact = false;

		// $scope.$watch('newContact', function(){
		//   $scope.newContactText = $scope.newContact ? 'Cancel' : 'Add New Contact';
		// });

		// $scope.$watch('isEditingNetwork', function(){
		//   $scope.isEditingNetworkText = $scope.isEditingNetwork ? 'Cancel' : 'Edit Network';
		// });