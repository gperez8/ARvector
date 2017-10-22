/* global angular, document, THREE, Parser, window, LZMA*/

angular.module('app')
	.controller('modelGenerateCtrl2', ($scope, $rootScope, $http) => {
		$("#menu-toggle").click(function(e) {
			e.preventDefault();
			$("#wrapper").toggleClass("toggled");
		});
		$rootScope.path = '/createModel2';
		$rootScope.graph($rootScope.zFuncTextR, $rootScope.customOption);
	});
