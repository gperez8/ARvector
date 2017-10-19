 /* global $, angular, document, localStorage */

angular.module('app')
	.controller('homeCtrl', ($scope, $http, $auth, $location, $rootScope) => {
		$scope.form;
		$http.get('/register')
			.then((data) => {
				console.log(data);
				$scope.view = data.data;
			});

		$scope.login = () => {
			$http.post('/login', $scope.form, 'json')
				.then((data) => {


					console.log('DATA', data.data);

					localStorage.setItem('name', data.data.name);
					localStorage.setItem('lastName', data.data.lastName);
					localStorage.setItem('ci_teacher', data.data.ci);
					localStorage.setItem('token', data.data.token);
					localStorage.setItem('rolUser', data.data.rol);
					localStorage.setItem('pathTeacher', JSON.stringify(data.data.pathTeacher));
					localStorage.setItem('pathTmp', JSON.stringify(data.data.pathTmp));
					$rootScope.login = localStorage.getItem('token');
					$rootScope.rolUser = localStorage.getItem('rolUser');
					$rootScope.pathTeacher = JSON.parse(localStorage.getItem('pathTeacher'));
					$rootScope.pathTmp = JSON.parse(localStorage.getItem('pathTmp'));
					$rootScope.fullName = localStorage.getItem('name') + ' ' + localStorage.getItem('lastName');  
					$rootScope.imgFileLoad();
					$rootScope.path = '/testMarker';
					$location.path('/testMarker');

				}, (error) => {
					console.log('error', error);
				});
		};

		$scope.register = () => {
			$location.path('/register');
		};
	});
