 /* global $, angular, document */

angular.module('app')
	.controller('homeCtrl', ($scope, $http, $auth, $location) => {

		$scope.form;

		$http.get('/register')
			.then((data) =>  {
				console.log(data);
				$scope.view = data.data;
			});
		
		$scope.login = () => {
			
			console.log('form', $scope.form);

			$http.post('/login', $scope.form, 'json')
				.then((data) => {
					console.log('data', data);
					localStorage.setItem('token', data.data.token);
					$location.path('/createMarker');
				})
				.catch((response) => {
					console.log('log incorrecto');
				});
		};

		$scope.register = () => {
			$location.path('/register');
		};
	});