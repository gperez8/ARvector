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
			.otherwise({
				redirectTo: '/',
			});
		$locationProvider.html5Mode(true);
}]);

console.log('router');
