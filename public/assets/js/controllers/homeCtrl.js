 /* global $, angular, document, localStorage */

angular.module('app')
	.controller('homeCtrl', ($scope, $http, $auth, $location) => {
		$scope.form;
		$http.get('/register')
			.then((data) => {
				console.log(data);
				$scope.view = data.data;
			});

		$scope.login = () => {
			$http.post('/login', $scope.form, 'json')
				.then((data) => {
					localStorage.setItem('token', data.data.token);
					$location.path('/createMarker');
				}, (error) => {
					console.log('error', error);
				});
		};

		$scope.register = () => {
			$location.path('/register');
		};
	});
