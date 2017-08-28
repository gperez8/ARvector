 /* global $, angular, document */

angular.module('app')
	.controller('homeCtrl', ($scope, $http, $auth, $location) => {
		$scope.form;
		/*$scope.peticionGet = () => {
			$http.get('/resourceMarker')
				.then((data) => {
					console.log('res->', data.data.res);
				});
		};*/
		$scope.login = () => {
			
			console.log("scope.form", $scope.form);

			$auth.login($scope.form)
				.then((data) => {
					console.log('data', data);
					$location.path('/createMarker');
				})
				.catch((response) => {
					console.log('log incorrecto');
				});
		};
		/*$scope.peticionPut = () => {
			$http.patch('/resourceMarker');
		};
		$scope.peticionDelete = () => {
			$http.delete('/resourceMarker');
		};*/
	});