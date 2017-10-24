/* global $, angular, document */

angular.module('app')
	.controller('registerCtrl', ($scope, $http, $auth, $location) => {

		$scope.form = {};
		$scope.view = {};

		$http.get('/register')
			.then((data) =>  {
				$scope.view = data.data;
				$scope.view.teachers.map((obj) => {
					return obj.fullName = obj.name + ' ' + obj.last_name;
				});
			});

		$scope.register = () => {
			swal({
              title: 'Esta a punto de registrarse',
              text: "¿Esta seguro de los datos suministrados?",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Si, guardar!'
            }).then(function () {
				$scope.form.rol = Number($scope.form.rol);
				$scope.form.school = Number($scope.form.school);
				//$scope.form.semester = Number($scope.form.semester);

				$http.post('/register/:'+$scope.form.rol, $scope.form, 'json')
					.then((data) => {
						swal(
	                        'Se ha registrado con exito!',
	                        'Felicidades ya es parte de nuestra comunidad',
	                        'success',
	                    );
	                    $location.path('/');
					})
					.catch((response) => {
						swal(
	                        'Ha ocurrido un error al registralo!',
	                        'Por favor verifique sus datos',
	                        'error',
	                    );
					});  
            })
		};

		$scope.login = () => {
			$location.path('/');
		};

		$scope.filterNumberOnly = ($event) => {
			if (isNaN(String.fromCharCode($event.keyCode))) {
				$event.preventDefault();
			}
		};

		$scope.filterLettersOnly = ($event) => {
			if (!($event.which >= 65 && $event.which <= 90) &&
				$event.which !== 8 &&
				$event.which !== 37 &&
				$event.which !== 39 &&
				$event.which !== 46 &&
				$event.which !== 9) {
				$event.preventDefault();
			}
		};
	});

angular.module('app')
	.filter('capitalize', function() {
		return function(input) {
			return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
		}
	});
