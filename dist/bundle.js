/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var THREEx = THREEx || {};

THREEx.ArPatternFile = {};

THREEx.ArPatternFile.toCanvas = function (patternFileString, onComplete) {
	console.assert(false, 'not yet implemented');
};

//////////////////////////////////////////////////////////////////////////////
//		function to encode image
//////////////////////////////////////////////////////////////////////////////

THREEx.ArPatternFile.encodeImageURL = function (imageURL, onComplete) {
	var image = new Image();
	image.onload = function () {
		var patternFileString = THREEx.ArPatternFile.encodeImage(image);
		onComplete(patternFileString);
	};
	image.src = imageURL;
};

THREEx.ArPatternFile.encodeImage = function (image) {
	// copy image on canvas
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	canvas.width = 16;
	canvas.height = 16;

	// document.body.appendChild(canvas)
	// canvas.style.width = '200px'


	var patternFileString = '';
	for (var orientation = 0; orientation > -2 * Math.PI; orientation -= Math.PI / 2) {
		// draw on canvas - honor orientation
		context.save();
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.translate(canvas.width / 2, canvas.height / 2);
		context.rotate(orientation);
		context.drawImage(image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
		context.restore();

		// get imageData
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height

		// generate the patternFileString for this orientation
		);if (orientation !== 0) patternFileString += '\n';
		// NOTE bgr order and not rgb!!! so from 2 to 0
		for (var channelOffset = 2; channelOffset >= 0; channelOffset--) {
			// console.log('channelOffset', channelOffset)
			for (var y = 0; y < imageData.height; y++) {
				for (var x = 0; x < imageData.width; x++) {

					if (x !== 0) patternFileString += ' ';

					var offset = y * imageData.width * 4 + x * 4 + channelOffset;
					var value = imageData.data[offset];

					patternFileString += String(value).padStart(3);
				}
				patternFileString += '\n';
			}
		}
	}

	return patternFileString;
};

//////////////////////////////////////////////////////////////////////////////
//		trigger download
//////////////////////////////////////////////////////////////////////////////

THREEx.ArPatternFile.triggerDownload = function (patternFileString) {
	// tech from https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
	var domElement = window.document.createElement('a');
	domElement.href = window.URL.createObjectURL(new Blob([patternFileString], { type: 'text/plain' }));
	domElement.download = 'generated-marker.patt';
	document.body.appendChild(domElement);
	domElement.click();
	document.body.removeChild(domElement);
};

THREEx.ArPatternFile.buildFullMarker = function (innerImageURL, onComplete) {
	var whiteMargin = 0.1;
	var blackMargin = 0.2;
	var innerMargin = whiteMargin + blackMargin;

	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	canvas.width = canvas.height = 512;

	context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.width, canvas.height

	// copy image on canvas
	);context.fillStyle = 'black';
	context.fillRect(whiteMargin * canvas.width, whiteMargin * canvas.height, canvas.width * (1 - 2 * whiteMargin), canvas.height * (1 - 2 * whiteMargin));

	// clear the area for innerImage (in case of transparent image)
	context.fillStyle = 'white';
	context.fillRect(innerMargin * canvas.width, innerMargin * canvas.height, canvas.width * (1 - 2 * innerMargin), canvas.height * (1 - 2 * innerMargin));

	// display innerImage in the middle
	var innerImage = document.createElement('img');
	innerImage.addEventListener('load', function () {
		// draw innerImage
		context.drawImage(innerImage, innerMargin * canvas.width, innerMargin * canvas.height, canvas.width * (1 - 2 * innerMargin), canvas.height * (1 - 2 * innerMargin));

		var imageUrl = canvas.toDataURL();
		onComplete(imageUrl);
	});
	innerImage.src = innerImageURL;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('app').controller('aboutCtrl', function ($scope) {
	$scope.algo = 'about';
	$(document).ready(function () {
		$('.parallax').parallax();
	});
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('app').controller('test3', function ($scope, $location) {
	$scope.home = function () {
		$location.path('/home');
	};

	$scope.createMarker = function () {
		$location.path('/createMarker');
	};

	$scope.testMarker = function () {
		$location.path('/testMarker');
	};

	$scope.createModel = function () {
		$location.path('/createModel');
	};
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global $, angular, document */

angular.module('app').controller('homeCtrl', function ($scope) {
	$scope.algo = 'INDEX';
	$(document).ready(function () {
		$('.carousel').carousel();
	});
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global angular, document, THREEx, pdfMake */

angular.module('app').controller('markerGenerateCtrl', function ($scope, $http) {
	$scope.entrada = '';
	$scope.imageQr = '';
	$scope.markerGenerated = '';

	$scope.buildMarker = function (imageQr) {
		THREEx.ArPatternFile.buildFullMarker(imageQr, function onComplete(markerUrl) {
			var markerImage = document.createElement('img');
			markerImage.src = markerUrl;

			var container = document.querySelector('#qr');
			while (container.firstChild) {
				container.removeChild(container.firstChild);
			}container.appendChild(markerImage);
			$scope.markerGenerated = markerImage;
			// $scope.pattFileGenerate(imageQr, markerImage);
		});
	};

	$scope.pattFileGenerate = function (imageQr, markerGenerated) {
		if (imageQr !== null && imageQr !== undefined && markerGenerated !== null && markerGenerated !== undefined) {
			THREEx.ArPatternFile.encodeImageURL(imageQr, function (patternFileString) {
				var file = new FileReader();
				file.readAsDataURL(new Blob([patternFileString], { type: 'text/plain' }));
				file.onload = function () {
					var data = {};
					// Se quita esto del archivo a enviar data:text/plain;base64,
					data.pattFile = file.result.substr(23);
					data.pattFileImage = markerGenerated.src.substr(21);
					data.name = 'gregory';
					data.asignature = 'vectorial';
					$http.post('/createMarker', data, 'json').then(function (response) {
						console.log('response', response);
					}, function (error) {
						console.log('error', error);
					});
				};
			});
		}
	};

	$scope.markerGenerate = function () {
		/* se genera el codigo QR */
		var container = document.createElement('div');
		var qrcode = new QRCode(container, {
			text: $scope.entrada,
			width: 256,
			height: 256,
			colorDark: '#000000',
			colorLight: '#ffffff'
		});

		/* Se dibuja el codigo QR sobre la imagen base */
		var canvasImg = container.querySelector('canvas');
		var image = canvasImg.toDataURL('image/png');
		$scope.imageQr = image;
		$scope.buildMarker(image);
	};

	$scope.generatePdf = function () {
		var docDefinition = {
			content: [{
				image: $scope.markerGenerated.src,
				width: 300,
				alignment: 'center'
			}]
		};
		pdfMake.createPdf(docDefinition).open();
	};
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('app').controller('modelGenerateCtrl', function ($scope) {
			$scope.hola = "hola mundo";

			var mathbox = mathBox({
						plugins: ['core', 'controls', 'cursor', 'mathbox'],
						controls: { klass: THREE.OrbitControls }
			});
			if (mathbox.fallback) throw "WebGL not supported";

			var three = mathbox.three;
			three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

			// 1. determine where the camera is looking at...

			// setting proxy:true allows interactive controls to override base position
			var camera = mathbox.camera({ proxy: true, position: [0, 0, 3] });

			// 2. coordinate system that contains...

			// save the view as a variable to simplify accessing it later
			var view = mathbox.cartesian({ range: [[-6.28, 6.28], [-2, 2]], scale: [2, 1] });

			// axes
			var xAxis = view.axis({ axis: 1, width: 8, detail: 40, color: "red" });
			var yAxis = view.axis({ axis: 2, width: 8, detail: 40, color: "green" });

			// grid
			var grid = view.grid({ width: 2, divideX: 20, divideY: 10, opacity: 0.25 });

			// 3. geometric data represented via...

			// the interval function will create a 1D array of data sampled between the view bounds
			var graphData = view.interval({
						expr: function expr(emit, x, i, t) {
									emit(x, Math.sin(x));
						},
						// width is the number of data points to generate; higher numbers = higher resolution
						width: 256,
						// channels indicate the dimensionality of the output (set to 2 for a 2D graph)
						channels: 2
			});

			// 4. choice of shape to draw it as...

			var graphView = view.line({ width: 4, color: "blue" });

			// alternatively, to view the data as points
			// view.point( {size: 6, color: "blue"});
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global $, angular, document */

angular.module('app').controller('testMarkerCtrl', function ($scope) {
	$scope.hola = 'hola';

	function handleSceneLoaded() {
		document.querySelector('#camera').setAttribute('orbit-controls', 'enabled', false);
		document.querySelector('#camera').setAttribute('position', '0 2 10');
		document.querySelector('#camera').setAttribute('orbit-controls', 'enabled', true);
		// ORBIT CAMERA DRAG START / END EVENT LISTENERS
		document.querySelector('#camera').addEventListener('start-drag-orbit-controls');
		document.querySelector('#camera').addEventListener('end-drag-orbit-controls');
	}

	document.addEventListener('DOMContentLoaded', function () {
		var scene = document.querySelector('a-scene');
		if (scene.hasLoaded) addEventListeners();else scene.addEventListener('loaded', handleSceneLoaded);
	});
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('app', ['ngRoute']);

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global angular */

angular.module('app').config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/home.html',
		controller: 'homeCtrl'
	}).when('/about', {
		templateUrl: 'views/about.html',
		controller: 'aboutCtrl'
	}).when('/createMarker', {
		templateUrl: 'views/createMarker.html',
		controller: 'markerGenerateCtrl'
	}).when('/createModel', {
		templateUrl: 'views/createModel.html',
		controller: 'modelGenerateCtrl'
	}).when('/testMarker', {
		templateUrl: 'views/testMarker.html',
		controller: 'testMarkerCtrl'
	}).otherwise({
		redirectTo: '/'
	});
	$locationProvider.html5Mode(true);
}]);

console.log('router');

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(7);

__webpack_require__(8);

__webpack_require__(1);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(4);

__webpack_require__(5);

__webpack_require__(6);

__webpack_require__(0);

/***/ })
/******/ ]);