angular.module('app')
	.controller('test3', ($scope, $location) => {
		$scope.home = () => {
			$location.path('/home');
		};

		$scope.createMarker = () => {
			$location.path('/createMarker');
		};

		$scope.testMarker = () => {
			$location.path('/testMarker');
		};

		$scope.createModel = () => {
			$location.path('/createModel');
		};
	});