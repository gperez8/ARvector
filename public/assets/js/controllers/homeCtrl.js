 /* global $, angular, document */

angular.module('app')
	.controller('homeCtrl', ($scope) => {
		$scope.algo = 'INDEX';
		$(document).ready(() => {
			$('.carousel').carousel();
		});
	});