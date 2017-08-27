 /* global $, angular, document */

angular.module('app')
	.controller('homeCtrl', ($scope, $http) => {
		$scope.algo = 'INDEX';
		$(document).ready(() => {
			$('.carousel').carousel();
		});

		$scope.peticionGet = () => {
			$http.get('/resourceMarker')
				.then((data) => {
					console.log('res->', data.data.res);
				});
		};
		$scope.peticionPost = () => {
			$http.post('/resourceMarker')
				.then((data) => {
					console.log('res->', data);
				});
		};
		$scope.peticionPut = () => {
			$http.patch('/resourceMarker');
		};
		$scope.peticionDelete = () => {
			$http.delete('/resourceMarker');
		};
	});