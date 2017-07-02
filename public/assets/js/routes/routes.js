/* global angular */

angular.module('app')
	.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
		$routeProvider
			.when('/', {
				templateUrl: 'views/home.html',
				controller: 'homeCtrl',
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'aboutCtrl',
			})
			.when('/createMarker', {
				templateUrl: 'views/createMarker.html',
				controller: 'markerGenerateCtrl',
			})
			.when('/createModel', {
				templateUrl: 'views/createModel.html',
				controller: 'modelGenerateCtrl',
			})
			.when('/testMarker', {
				templateUrl: 'views/testMarker.html',
				controller: 'testMarkerCtrl',
			})
			.otherwise({
				redirectTo: '/',
			});
		$locationProvider.html5Mode(true);
	}]);

console.log('router');
