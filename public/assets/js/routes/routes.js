/* global angular */

angular.module('app')
	.config(($authProvider, $routeProvider, $httpProvider,  $locationProvider) => {
        $authProvider.tokenName = 'token';
        $authProvider.tokenPrefix = 'ARvector';
        $authProvider.tokenHeader = 'Authorization';
		$authProvider.tokenType = 'Bearer';
		$authProvider.storageType = 'localStorage';
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
			.when('/register', {
				templateUrl: 'views/register.html',
				controller: 'registerCtrl',
			})
			.otherwise({
				redirectTo: '/',
			});
		$locationProvider.html5Mode(true);

		$httpProvider.interceptors.push(($q, $location, $localStorage) => {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};

                    if (localStorage.getItem("token")) {
                        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
                    }
                    return config;
                },
                'responseError': function(response) {
                    if(response.status === 401 || response.status === 403) {
                        $location.path('/home');
                    }
                    return $q.reject(response);
                }
            };
        });
	});
