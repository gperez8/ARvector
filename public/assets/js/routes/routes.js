angular.module('test1')
	.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
		$routeProvider
			.when('/', {
				templateUrl: 'views/home.html',
				controller: 'test2',
			})
			.when('/about', {
				templateUrl: 'views/about.html',
				controller: 'test3',
			})
			.otherwise({
				redirectTo: '/',
			});
		$locationProvider.html5Mode(true);
}]);

console.log('router');