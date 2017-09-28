 /* global $, angular, document */

angular.module('app')
	.controller('testMarkerCtrl', ($scope, $rootScope) => {

		$("#menu-toggle").click(function(e) {
			e.preventDefault();
			$("#wrapper").toggleClass("toggled");
		});

		$rootScope.login = localStorage.getItem('token');
		$rootScope.rolUser = localStorage.getItem('rolUser');
		$rootScope.path = '/testMarker';

		function handleSceneLoaded() {
			document.querySelector('#camera').setAttribute('orbit-controls', 'enabled', false);
			document.querySelector('#camera').setAttribute('position', '0 2 10');
			document.querySelector('#camera').setAttribute('orbit-controls', 'enabled', true);
			// ORBIT CAMERA DRAG START / END EVENT LISTENERS
			document.querySelector('#camera').addEventListener('start-drag-orbit-controls');
			document.querySelector('#camera').addEventListener('end-drag-orbit-controls');
		}

		document.addEventListener('DOMContentLoaded', () => {
			const scene = document.querySelector('a-scene');
			if (scene.hasLoaded) addEventListeners();
			else scene.addEventListener('loaded', handleSceneLoaded);
		});
	});