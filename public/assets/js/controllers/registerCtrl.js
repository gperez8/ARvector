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


			$scope.form.rol = Number($scope.form.rol);
			$scope.form.school = Number($scope.form.school);
			//$scope.form.semester = Number($scope.form.semester);
			console.log('register scope.form', $scope.form);

			$http.post('/register/:'+$scope.form.rol, $scope.form, 'json')
				.then((data) => {
					console.log('data', data);
				})
				.catch((response) => {
					console.log('log incorrecto');
				});
		};

		$scope.login = () => {
			$location.path('/');
		};

		$scope.filterNumberOnly = ($event) => {
			if (isNaN(String.fromCharCode($event.keyCode))) {
				$event.preventDefault();
			}
		};

		$scope.filterLettersOnly = ($event) => {
			if (!($event.which >= 65 && $event.which <= 90) &&
				$event.which !== 8 &&
				$event.which !== 37 &&
				$event.which !== 39 &&
				$event.which !== 46 &&
				$event.which !== 9) {
				$event.preventDefault();
			}
		};
	});

angular.module('app')
	.filter('capitalize', function() {
		return function(input) {
			return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
		}
	});
