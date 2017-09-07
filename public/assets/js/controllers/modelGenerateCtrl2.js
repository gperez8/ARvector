/* global angular, document, THREE, Parser, window, LZMA*/

angular.module('app')
	.controller('modelGenerateCtrl2', ($scope,$rootScope, $http) => {
		$("#menu-toggle").click(function(e) {
			e.preventDefault();
			$("#wrapper").toggleClass("toggled");
		});

		$rootScope.graph();

		$scope.updateGraph = () => {
			const scene = document.querySelector('#scene');
			scene.removeChild(scene.childNodes[3]);
			$rootScope.graph();
		};
	});
