 /* global $, angular, document */

angular.module('app')
	.controller('homeCtrl', ($scope, $http, $auth, $location) => {

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
			$auth.login({
				email: 'gregory.facyt@gmail.com',
				password: 'skdjsfldkjdfl',
			})
			.then((data) => {
				console.log('data', data);
				$location.path('/createMarker');
			})
			.catch((response) => {
				console.log('log incorrecto');
			});
		};
		$scope.peticionPut = () => {
			$http.patch('/resourceMarker');
		};
		$scope.peticionDelete = () => {
			$http.delete('/resourceMarker');
		};
	});