angular.module('app')
	.controller('aboutCtrl', ($scope) => {
		$scope.algo = 'about';
		$(document).ready(function(){
          $('.parallax').parallax();
        });
	});