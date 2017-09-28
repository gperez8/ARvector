 /* global $, angular, document, localStorage */

angular.module('app')
	.controller('homeCtrl', ($scope, $http, $auth, $location, $rootScope) => {
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
					localStorage.setItem('rolUser', data.data.rol);
					$rootScope.login = localStorage.getItem('token');
					$rootScope.rolUser = localStorage.getItem('rolUser');
					$rootScope.path = '/testMarker';
					$location.path('/testMarker');
				}, (error) => {
					console.log('error', error);
				});
		};

		$scope.register = () => {
			$location.path('/register');
		};
	});
