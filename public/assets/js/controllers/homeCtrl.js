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
					localStorage.setItem('token', data.data.token);
					localStorage.setItem('rolUser', data.data.rol);

					$rootScope.login = localStorage.getItem('token');
					$rootScope.rolUser = localStorage.getItem('rolUser');
					$rootScope.fullName = localStorage.getItem('name') + ' ' + localStorage.getItem('lastName'); 
					$rootScope.path = '/testMarker';

					if (data.data.rol === 3 ) {
						localStorage.setItem('ci_teacher', data.data.ci);
						localStorage.setItem('pathTeacher', JSON.stringify(data.data.pathTeacher));
						localStorage.setItem('pathTmp', JSON.stringify(data.data.pathTmp));
						$rootScope.pathTeacher = JSON.parse(localStorage.getItem('pathTeacher'));
						$rootScope.pathTmp = JSON.parse(localStorage.getItem('pathTmp'));
						$rootScope.imgFileLoad();

					} else if (data.data.rol === 2) {
						localStorage.setItem('guides', JSON.stringify(data.data.guidesNames[0]));
						localStorage.setItem('asignatures', JSON.stringify(data.data.asignatureName));
						$rootScope.guides = JSON.parse(localStorage.getItem('guides'));
						$rootScope.asignatures = JSON.parse(localStorage.getItem('asignatures'));

						console.log('$rootScope.guides', $rootScope.guides);
						console.log('$rootScope.asignatures', $rootScope.asignatures);
					}
					$location.path('/testMarker');

				}, (error) => {
					console.log('error', error);
				});
		};

		$scope.register = () => {
			$location.path('/register');
		};
	});
