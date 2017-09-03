/* global $, angular, document */

angular.module('app')
	.controller('registerCtrl', ($scope, $http, $auth, $location) => {

		$scope.form = {};
		$scope.view = {};

		$http.get('/register')
			.then((data) =>  {
				console.log(data);
				$scope.view = data.data;
			});

		$scope.register = () => {
			console.log('register scope.form', $scope.form);

			$http.post('/register', $scope.form, 'json')
				.then((data) => {
					console.log('data', data);
				})
				.catch((response) => {
					console.log('log incorrecto');
				});
		};
	});
