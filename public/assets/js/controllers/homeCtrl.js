 /* global $, angular, document */

angular.module('app')
	.controller('homeCtrl', ($scope, $http) => {
		$scope.algo = 'INDEX';
		$(document).ready(() => {
			$('.carousel').carousel();
		});

		$scope.peticionGet = () => {
			$http.get('/career')
				.then((data) => {
					console.log('res->',data.data.res);
				});
		}
		$scope.peticionPost = () => {
			$http.post('/career')
				.then((data) => {
					console.log('res->', data);
				});
		}
		$scope.peticionPut = () => {
			$http.patch('/career');
		}
		$scope.peticionDelete = () => {
			$http.delete('/career');
		}
	});