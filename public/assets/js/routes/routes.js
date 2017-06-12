angular.module('test1')
	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'home.html',
				controller: 'test2',
			})
			.when('/about', {
				templateUrl: 'about.html',
				controller: 'test3',
			})
			.otherwise({
				redirectTo: '/',
			});
		$locationProvider.html5Mode(true);
}]);

console.log('router');