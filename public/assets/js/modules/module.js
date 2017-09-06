angular.module('app', ['ngRoute', 'ngStorage', 'satellizer', 'ui.bootstrap'])
	.run(($rootScope) => {
		$rootScope.login = localStorage.getItem('token');
	});