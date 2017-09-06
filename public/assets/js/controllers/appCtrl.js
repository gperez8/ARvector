angular.module('app')
	.controller('appCtrl', ($scope, $location, $rootScope) => {
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
			$location.path('/createModel2');
		};

		$scope.isLogin = () => {
			return $rootScope.login !== '' && $rootScope.login !== null;
		};
	});