angular.module('app')
	.controller('appCtrl', ($scope, $location, $rootScope, Upload, $timeout, $http) => {
		var tmpList = [];
		$scope.arrow = {};
		$scope.arrow.profile = false;
		$scope.arrow.advOptions = false;
		$scope.customOption = $rootScope.customOption;
		$scope.file = '';

		$scope.list2 = [];

		$scope.path = $rootScope.path;

		$scope.home = () => {
			$location.path('/home');
		};

		$scope.createMarker = () => {
			$location.path('/createMarker');
		};

		$scope.testMarker = () => {
			$scope.path = '/testMarker';
			$location.path('/testMarker');
		};

		$scope.createModel = () => {
			$scope.path = '/createModel2';
			$location.path('/createModel2');
		};

		$scope.isLogin = () => {
			return $rootScope.login !== '' && $rootScope.login !== null;
		};

		$scope.updateGraph = () => {
			const newFunction = document.querySelector('#zFunctionText').value;
			const scene = document.querySelector('#scene');
			scene.removeChild(scene.childNodes[3]);
			$rootScope.graph(newFunction, $scope.customOption);
		};

		$scope.graphGenerate = () => {
			$rootScope.exporter();
		};

		$scope.logout = () => {
			$rootScope.logout();
			$rootScope.login = localStorage.getItem('token');
			$scope.home();
		};

		$scope.eventArrowOption = () => {
			$scope.arrow.advOptions = !$scope.arrow.advOptions;
			$scope.arrow.typeOption = 'graph';
		};

			$scope.rawScreens = [
				[{
					icon: './img/icons/facebook.jpg',
					title: 'Facebook (a)',
					link: 'https://www.facebook.com',
				}, {
					icon: './img/icons/youtube.jpg',
					title: 'Youtube (a)',
					link: 'https://www.youtube.com',
				}, {
					icon: './img/icons/gmail.jpg',
					title: 'Gmail (a)',
					link: 'http://www.gmail.com',
				}, {
					icon: './img/icons/google+.jpg',
					title: 'Google+ (a)',
					link: 'https://plus.google.com',
				}, {
					icon: './img/icons/twitter.jpg',
					title: 'Twitter (a)',
					link: 'https://www.twitter.com',
				}, {
					icon: './img/icons/yahoomail.jpg',
					title: 'Yahoo Mail (a)',
					link: 'http://mail.yahoo.com',
				}, {
					icon: './img/icons/pinterest.jpg',
					title: 'Pinterest (a)',
					link: 'https://www.pinterest.com',
				}],
				[],
			];

		$scope.load = () => {
			const data = {};
			data.hola = "hola";
			$http.post('/model', data, 'json')
				.then((data) => {

					console.log('data', data);
					const path = data.data.path;
					const models = data.data.pathFilesName;

					$scope.list2 =  models.map((obj) => {
						return {
							name: obj,
							src: path + obj,						
						};
					});

					console.log('$scope.list2', $scope.list2);

				});
			};

		$scope.list1 = [];
		
 		$scope.list3 = $scope.rawScreens[1];

		$scope.print = () => {
			console.log('marker', $rootScope.markers);
		};

		$scope.importFileObj = (file) => {
			Upload.upload({
				url: '/importModel',
				method: 'POST',
				data: {name: 'pruebaImport'},
				file: file,
			}).then((response) => {
				console.log('response', response);
			}).catch((err) => {
				console.log('err', err);
			});
		};

		$scope.sortableOptions = {
			placeholder: 'app',
			connectWith: '.apps-container',
		};
	});