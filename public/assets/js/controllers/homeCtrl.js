import swal from 'sweetalert2';
 /* global $, angular, document, localStorage */

angular.module('app')
	.controller('homeCtrl', ($scope, $http, $auth, $location, $rootScope) => {
		$scope.form;
		$http.get('/register')
			.then((data) => {
				$scope.view = data.data;
			});

		$scope.login = () => {
			$http.post('/login', $scope.form, 'json')
				.then((data) => {

					localStorage.setItem('name', data.data.name);
					localStorage.setItem('lastName', data.data.lastName);
					localStorage.setItem('token', data.data.token);
					localStorage.setItem('rolUser', data.data.rol);

					$rootScope.login = localStorage.getItem('token');
					$rootScope.rolUser = localStorage.getItem('rolUser');
					$rootScope.fullName = localStorage.getItem('name') + ' ' + localStorage.getItem('lastName'); 
					$rootScope.path = '/testMarker';

					
					$rootScope.customOption.x.min = -3;
					$rootScope.customOption.x.max = 3;
					$rootScope.customOption.y.min = -3;
					$rootScope.customOption.y.max = 3;
					$rootScope.customOption.z.min = -3;
					$rootScope.customOption.z.max = 3;

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
					}

					$location.path('/testMarker');

				}, (error) => {
					console.log('error', error);
					swal({
						title: 'Ha ocurrido un error',
						text: 'Revise su email y contraseña',
						type: 'error',
						confirmButtonText: 'Aceptar'
					});       
				});
		};

		$scope.register = () => {
			$location.path('/register');
		};
	});
