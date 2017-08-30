 /* global $, angular, document */

angular.module('app')
	.controller('homeCtrl', ($scope, $http, $auth, $location) => {
		$scope.form;
		$scope.login = () => {
			$http.post('/users', $scope.form, 'json')
				.then((data) => {
					console.log('data', data);
					$location.path('/createMarker');
				})
				.catch((response) => {
					console.log('log incorrecto');
				});
		};
	});