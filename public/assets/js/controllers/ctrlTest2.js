angular.module('app')
	.controller('test3', ($scope, $location) => {
		$scope.home = () => {
			$location.path('/home');
		};

		$scope.about = () => {
			$location.path('/about');
		};
	});