angular.module('test1').config(($routeProvider) => {
	$routeProvider
	.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'mainController',
	})
	.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'mainController',
	})
	.otherwise({
		redirectTo: '/',
	});
});
