angular.module('app')
	.controller('appCtrl', ($scope, $location, $rootScope) => {
		
		$scope.path = $location.path();
		$scope.home = () => {
			$location.path('/home');
		};

		$scope.createMarker = () => {
			$location.path('/createMarker');
		};

		$scope.testMarker = () => {
			$scope.path = '/testMarker';
			$location.path('/testMarker');
		};

		$scope.createModel = () => {
			$scope.path = '/createModel2';
			$location.path('/createModel2');
		};

		$scope.isLogin = () => {
			return $rootScope.login !== '' && $rootScope.login !== null;
		};

		$scope.updateGraph = () => {
			const newFunction = document.querySelector('#zFunctionText').value;
			const scene = document.querySelector('#scene');
			scene.removeChild(scene.childNodes[3]);
			$rootScope.graph(newFunction);
		};

		$scope.graphGenerate = () => {
			$rootScope.exporter();
		};
	});