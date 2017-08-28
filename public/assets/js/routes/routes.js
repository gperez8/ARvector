/* global angular */

angular.module('app')
	.config(($authProvider, $routeProvider, $locationProvider) => {
		$authProvider.loginUrl = 'http://localhost:3000/login';
        $authProvider.tokenName = 'token';
        $authProvider.tokenPrefix = 'ARvector';
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
			.when('/createModel2', {
				templateUrl: 'views/createModel2.html',
				controller: 'modelGenerateCtrl2',
			})
			.when('/testMarker', {
				templateUrl: 'views/testMarker.html',
				controller: 'testMarkerCtrl',
			})
			.when('/mathEditor', {
				templateUrl: 'views/mathEditor.html',
				controller: 'mathEditorCtrl',
			})
			.otherwise({
				redirectTo: '/',
			});
		$locationProvider.html5Mode(true);
	});
