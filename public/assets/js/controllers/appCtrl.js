angular.module('app')
	.controller('appCtrl', ($scope, $location, $rootScope, Upload, $timeout, $http) => {
		var tmpList = [];
		$scope.arrow = {};
		$scope.arrow.profile = false;
		$scope.arrow.advOptions = false;
		$scope.customOption = $rootScope.customOption;
		$scope.file = '';
		$scope.auxUI = '';

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

		$scope.fileLoad = () => {
			$http({
				method: 'GET',
				url: '/model/:3',
				data: {},
				headers: { 'Content-Type': 'application/json;charset=utf-8' },

			}).then((data) => {
				const path = data.data.path;
				const models = data.data.pathFilesName;
				$scope.list2 =  models.map((obj) => {
					return {
						name: obj,
						src: path + obj,			
					};
				});
			});
		};

		$scope.list1 = [];
		
 		$scope.list3 = $scope.rawScreens[1];

		$scope.print = () => {
			console.log('marker', $rootScope.markers);
		};

		$scope.importFileObj = (file) => {
			Upload.upload({
				url: '/model',
				method: 'POST',
				data: { name: 'pruebaImport' },
				file: file,
			}).then((response) => {
				$scope.list2.push({
					name: response.data.pathFilesName,
					src: response.data.path + response.data.pathFilesName,
				})
			}).catch((err) => {
				console.log('err', err.data.error);
			});
		};

		$scope.deleteFile = () => {
			const selectModel = $scope.list2.filter((obj) => {
				if (obj.check) return obj;
			});

			$http({
				method: 'DELETE',
				url: '/model/:3',
				data: { path: selectModel },
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
			}).then((response) => {

				$scope.list2 = $scope.list2.filter((obj) => {
					if (!obj.check) return obj;
				});
			}).catch((err) => {
				console.log('err', err);
			});		
		};

		$scope.updateScene = (index) => {

			$rootScope.markers[index].src.push({});
			
			const scene = document.querySelector('a-scene');
			const assets = scene.querySelector('#a-assets');
			const target = scene.querySelector('#target');

			/* se crea un nuevo a-asset-item */
			const newAssetItem = document.createElement('a-asset-item');
			newAssetItem.setAttribute('id', $rootScope.markers[index].src[0].name);
			newAssetItem.setAttribute('src', $rootScope.markers[index].src[0].src);

			/* se inserta a-asset-item como hijo de a-assets */
			assets.appendChild(newAssetItem);

			console.log('assets', assets);

			/* se crea un nuevo a-marker */
			const newAMarker = document.createElement('a-marker');
			newAMarker.setAttribute('type', 'pattern');
			newAMarker.setAttribute('url', $rootScope.markers[index].patternFilePath);

			/* se crea un nuevo a-gltf-model (recurso a ser proyectado) */
			const newGltfModel = document.createElement('a-gltf-model');
			newGltfModel.setAttribute('src', `#${$rootScope.markers[index].src[0].name}`);
			newGltfModel.setAttribute('position', '0 0.5 0');
			newGltfModel.setAttribute('scale', '0.5 0.5 0.5');

			newAMarker.appendChild(newGltfModel);
			target.appendChild(newAMarker);

			console.log('target', target);
		
			$rootScope.markers[index].src = $rootScope.markers[index].src.filter((obj) => {
				return(obj.name && obj.src);
			});
			$rootScope.$apply();

		};

		$scope.sortableOptions = {
			placeholder: 'app',
			connectWith: '.apps-container',
			'update': function(e, ui) {

				console.log('e-->', e);
				console.log('ui-->', ui);
				$scope.auxUI = ui.item.sortable.model;
			}
		};
	});