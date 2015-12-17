'use strict';

angular.module('bonzai')
	.controller('NetworkCtrl', ['$scope', '$location', '$http', 'Auth', function ($scope, $location, $http, Auth){
		//NETWORK
		$scope.currentUser = Auth.currentUser();

		//Get all user networks
		$http.get('/api/me')
		  .success(function(response) {
		    $scope.user = response;
		    // console.log($scope.networks);
				$scope.currentNetwork = $scope.user.networks[0];
				// console.log(response);
		  })
		  .error(function(response) {
		    console.log(response);
		 });

		//SETS CURRENT NETWORK
		$scope.setCurrentNetwork = function (network){
			$scope.currentNetwork = network;
			return $scope.currentNetwork !== null && network.title === $scope.currentNetwork.title;
		};

		// CREATES NETWORK    
		$scope.createNetwork = function(network) {
		  $http.post('/api/networks', { title: $scope.network.title, user_id: $scope.currentUser._id })
		    .success(function (response) {
		      console.log(response);
		      $scope.user.networks.push(response);
		      $scope.network = null;
		      $scope.currentNetwork = $scope.user.networks[$scope.user.networks.length-1];
		    }).error(function (error) {
		      console.log("This is an error:", error);
		    });      
		};

		// DELETES NETWORK
		$scope.deleteNetwork = function (network){
			var networkIndex = ($scope.user.networks.indexOf(network));
			$http.delete('/api/networks/' + network._id)
				.success(function(response){
					$scope.user.networks.splice(networkIndex, 1);
					if ($scope.user.networks[0] !== undefined) {
						$scope.setCurrentNetwork($scope.user.networks[0]);
						console.log($scope.currentNetwork);
					} else {
						$scope.currentNetwork = null;
					}
				}).error(function(error){
					console.log("This is an error:", error);
				});
		};
		

		$scope.editing = false;
		$scope.newContact = false;

		$scope.$watch('newContact', function(){
		  $scope.newContactText = $scope.newContact ? 'Cancel' : 'Add New Contact';
		});

		$scope.$watch('isEditingNetwork', function(){
		  $scope.isEditingNetworkText = $scope.isEditingNetwork ? 'Cancel' : 'Edit Network';
		});

		//GET ALL CONTACTS
		$http.get('/api/contacts') 
		  .success(function(response) {
		    // console.log(response);
		    $scope.contacts = response;
		  })
		  .error(function(response) {
		    console.log(response);
		 });

		// NEW Contact
		// create an empty 'post' object within the scope
		$scope.contacts = [];
		$scope.contact = {};

		// CREATE A New Contact   
		$scope.createContact = function(contact) {
		  var daysToMilli = $scope.contact.days*60*1000;
		  var currentDate = Date.now();
		  var deadline = daysToMilli + currentDate;
		  $http.post('/api/contacts', { name:$scope.contact.name, deadline:deadline, days: $scope.contact.days, network_id: $scope.currentNetwork._id })
		    .success(function (response) {
		    	$scope.currentNetwork.contacts.push(response);
		    	$scope.contact = null;
		    }).error(function (error) {
		      console.log("This is an error:", error);
		    });      
		};
		//Deadline Color Change
		$scope.turnRed = function (contact) {
		  // console.log('sup');
		  contact.time_left = false;
		  $http.put('api/contacts/' + contact._id, contact) 
		    .success(function(response){
		      // console.log(response);
		    }).error(function(error){
		      console.log(error);
		    });
		};
		//Halftime Color Change
		$scope.turnYellow = function (contact) {
		  console.log('sup');
		};

		// EDIT A POST
		$scope.editContact = function(contact) {
		  $http.put('api/contacts/' + contact._id, contact)
		    .success(function(response){
		      console.log(response);
		      $scope.editing = false;
		    }).error(function(error){
		      console.log(error);
		    });
		};

		// DELETE A CONTACT
		$scope.deleteContact = function(contact) {
		  var contactIndex = ($scope.currentNetwork.contacts.indexOf(contact));
		  // console.log(contactIndex);
		  $http.delete('api/contacts/' + contact._id) 
		    .success(function (response) {
		      // $scope.contacts.splice(contactIndex, 1);
		      $scope.currentNetwork.contacts.splice(contactIndex, 1);
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
		    	$scope.$broadcast('timer-start')
		      console.log(response);
		    }).error(function(error){
		      console.log(error);
		    });
		};

}]);