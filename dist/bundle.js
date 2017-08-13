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
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
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


var _ImageImport = __webpack_require__(11);

var _ImageResize = __webpack_require__(12);

/* global angular, document, Quill, window */
angular.module('app').controller('mathEditorCtrl', function ($scope) {
	Quill.register('modules/imageImport', _ImageImport.ImageImport);
	Quill.register('modules/imageResize', _ImageResize.ImageResize);
	var toolbarOptions = [[{ header: [1, 2, 3, 4, 5, 6, false] }], [{ font: [] }], [{ size: ['small', false, 'large', 'huge'] }], ['blockquote', 'code-block'], ['bold', 'italic', 'underline', 'strike'], // toggled buttons

	// custom button values
	[{ list: 'ordered' }, { list: 'bullet' }], [{ align: [] }], [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
	[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
	[{ direction: 'rtl' }], // text direction

	// custom dropdown
	[{ color: [] }, { background: [] }], ['link', 'image', 'video', 'formula'], // dropdown with defaults from theme
	['clean']];

	var quill = new Quill('#editor', {
		theme: 'snow',
		modules: {
			formula: true,
			toolbar: toolbarOptions,
			history: {
				delay: 1000,
				maxStack: 50,
				userOnly: false
			},
			imageImport: true,
			imageResize: {
				displaySize: true
			}
		}
	});

	$scope.hola = function () {
		var remove = document.querySelector('.ql-toolbar');
		var editor = document.querySelector('#editor');
		var parent = remove.parentNode;

		parent.removeChild(remove);
		window.print();
		window.close();

		parent.insertBefore(remove, editor);
	};
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global angular, mathBox, THREE */

angular.module('app').controller('modelGenerateCtrl', function ($scope) {
	$scope.hola = 'hola mundo';
	// se crea una instancia de mathBox
	var mathbox = mathBox({
		plugins: ['core', 'controls', 'cursor', 'mathbox'],
		controls: { klass: THREE.OrbitControls }
	});
	if (mathbox.fallback) throw new Error('WebGL not supported');

	// se crea una variable three para acceder a los metodos
	// three.renderer, three.scene, three.camera
	var three = mathbox.three;

	// limpia el color de la escena y lo coloca en blanco
	three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

	three.camera = mathbox.camera({
		proxy: true,
		position: [0, 0, 3]
	});

	var view = mathbox.cartesian({
		range: [[-3, 3], [-3, 3], [-3, 3]],
		scale: [2, 1, 2]
	});

	// Caracteristicas del eje X
	view.axis({ axis: 1, width: 8, detail: 40, color: 'red' });
	var xScale = view.scale({ axis: 1, divide: 10, nice: true, zero: true });
	view.ticks({ width: 5, size: 15, color: 'red', zBias: 2 });
	var xFormat = view.format({ digits: 2, font: 'Arial', weight: 'bold', style: 'normal', source: xScale });
	view.label({ color: 'red', zIndex: 0, offset: [0, -20], points: xScale, text: xFormat });

	// Caracteristicas del eje Y
	view.axis({ axis: 3, width: 8, detail: 40, color: 'green' });
	var yScale = view.scale({ axis: 3, divide: 5, nice: true, zero: false });
	view.ticks({ width: 5, size: 15, color: 'green', zBias: 2 });
	var yFormat = view.format({ digits: 2, font: 'Arial', weight: 'bold', style: 'normal', source: yScale });
	view.label({ color: 'green', zIndex: 0, offset: [0, 0], points: yScale, text: yFormat });

	// Caracteristicas del eje Z
	view.axis({ axis: 2, width: 8, detail: 40, color: 'blue' });
	var zScale = view.scale({ axis: 2, divide: 5, nice: true, zero: false });
	view.ticks({ width: 5, size: 15, color: 'blue', zBias: 2 });
	var zFormat = view.format({ digits: 2, font: 'Arial', weight: 'bold', style: 'normal', source: zScale });
	view.label({ color: 'blue', zIndex: 0, offset: [0, 0], points: zScale, text: zFormat });

	view.grid({ axes: [1, 3], width: 2, divideX: 20, divideY: 20, opacity: 0.25 });

	var graphData = view.area({
		axes: [1, 3],
		channels: 3,
		width: 64,
		height: 64,
		expr: function expr(emit, x, y, i, j, t) {
			var z = x * y;
			emit(x, z, y);
		}
	});

	// actuall emitter set later.
	var graphColors = view.area({
		expr: function expr(emit, x, y, i, j, t) {
			if (x < 0) {
				emit(1.0, 0.0, 0.0, 1.0);
			} else {
				emit(0.0, 1.0, 0.0, 1.0);
			}
		},
		axes: [1, 3],
		width: 64,
		height: 64,
		channels: 4 // RGBA
	});

	var graphShaded = false;
	var graphViewSolid = view.surface({
		points: graphData,
		color: '#FFFFFF',
		shaded: false,
		fill: true,
		lineX: false,
		lineY: false,
		colors: graphColors,
		visible: true,
		width: 0
	});

	var graphWireVisible = true;
	var graphViewWire = view.surface({
		points: graphData,
		color: '#000000',
		shaded: false,
		fill: false,
		lineX: true,
		lineY: true,
		visible: graphWireVisible,
		width: 2
	});

	var functionText = '(x)^2 - (y)^2';
	var a = 1,
	    b = 1;
	var xMin = -3,
	    xMax = 3,
	    yMin = -3,
	    yMax = 3,
	    zMin = -3,
	    zMax = 3;

	var zAutofit = true;

	// start of updateGraph function ==============================================================
	var updateGraphFunc = function updateGraphFunc() {
		var zFunc = Parser.parse(functionText).toJSFunction(['x', 'y']);
		graphData.set('expr', function (emit, x, y, i, j, t) {
			emit(x, zFunc(x, y), y);
		});

		if (zAutofit) {
			var xStep = (xMax - xMin) / 256;
			var yStep = (yMax - yMin) / 256;
			var zSmallest = zFunc(xMin, yMin);
			var zBiggest = zFunc(xMin, yMin);
			for (var x = xMin; x <= xMax; x += xStep) {
				for (var y = yMin; y <= yMax; y += yStep) {
					var z = zFunc(x, y);
					if (z < zSmallest) zSmallest = z;
					if (z > zBiggest) zBiggest = z;
				}
			}
			zMin = zSmallest;
			zMax = zBiggest;
		}
		view.set('range', [[xMin, xMax], [zMin, zMax], [yMin, yMax]]);

		/*if (graphColorStyle === 'Grayscale')
  {
  	// zMax = white, zMin = black
  	graphColors.set('expr',	function (emit, x, y, i, j, t) {
  		var z = zFunc(x,y);
  		var percent = (z - zMin) / (zMax - zMin);
  		emit( percent, percent, percent, 1.0 );
  	});
  } else if (graphColorStyle === 'Rainbow') {
  	graphColors.set('expr', function (emit, x, y, i, j, t) {
  		const z = zFunc(x, y);
  		const percent = (z - 1.2 * zMin) / (zMax - 1.2 * zMin);
  		const color = new THREE.Color(0xffffff);
  		color.setHSL(1-percent, 1, 0.5);
  		emit(color.r, color.g, color.b, 1.0);
  	});
  } else if (graphColorStyle === 'Solid Blue') {
  	// just a solid blue color
  	graphColors.set('expr',	function (emit, x, y, i, j, t) {
  		emit( 0.5, 0.5, 1.0, 1.0);
  	});
  }*/
	};

	updateGraphFunc();

	$scope.generateModel = function () {

		/* console.log('three1->', three.scene);
  console.log('three2->', three.scene.children[0].children[0]); */
		//console.log('graphData->' graphData);

		/* var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var mesh = new THREE.Mesh( geometry, material );
  
  console.log('mesh', mesh);*/

		/* var exporter = new THREE.OBJExporter();
  console.log(exporter.parse( three.scene.children[0].children[12] )); */
	};
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global angular, document, THREE, Parser, window, LZMA*/

angular.module('app').controller('modelGenerateCtrl2', function ($scope, $http) {
	var graphMesh = void 0;
	var segments = 80;
	var xMin = -3;
	var xMax = 3;
	var xRange = xMax - xMin;
	var yMin = -3;
	var yMax = 3;
	var yRange = yMax - yMin;
	var zMin = -3;
	var zMax = 3;
	var zRange = zMax - zMin;

	var zFuncText = 'x^2 - y^2';
	var zFunc = Parser.parse(zFuncText).toJSFunction(['x', 'y']);

	var scene = new THREE.Scene();
	scene.background = new THREE.Color(0xf0f0f0);

	/* Configuracion de la camara */
	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45;
	var ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
	var NEAR = 0.1;
	var FAR = 20000;

	var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

	camera.position.set(2 * xMax, 0.5 * yMax, 4 * zMax);
	camera.up = new THREE.Vector3(0, 0, 1);
	camera.lookAt(scene.position);
	scene.add(camera);
	/* FIN de la Configuracion de la camara */

	/* control sobre la scena */
	var controls = new THREE.OrbitControls(camera);
	controls.addEventListener('change', render);
	/* FIn control sobre la scena */

	/* Plano r3 */
	var helper = new THREE.GridHelper(6, 10);
	helper.rotateX(Math.PI / 2);
	helper.material.opacity = 0.25;
	helper.material.transparent = true;
	scene.add(helper);
	/* FIN de Plano r3 */

	/* Ejes XYZ */
	var axis = new THREE.AxisHelper(10);
	scene.add(axis);
	/* FIN de Ejes XYZ */

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	camera.position.z = 5;

	// "wireframe texture"
	var wireTexture = new THREE.ImageUtils.loadTexture();
	wireTexture.wrapS = THREE.RepeatWrapping;
	wireTexture.wrapT = THREE.RepeatWrapping;
	wireTexture.repeat.set(40, 40);

	var wireMaterial = new THREE.MeshBasicMaterial({
		map: wireTexture,
		vertexColors: THREE.VertexColors,
		side: THREE.DoubleSide
	});

	var vertexColorMaterial = new THREE.MeshBasicMaterial({
		vertexColors: THREE.VertexColors,
		side: THREE.DoubleSide
	});

	renderer.setClearColor(0x888888, 1);

	xRange = xMax - xMin;
	yRange = yMax - yMin;
	zFunc = Parser.parse(zFuncText).toJSFunction(['x', 'y']);

	function meshFunction(a, b) {
		var x = xRange * a + xMin;
		var y = yRange * b + yMin;
		var z = zFunc(x, y);

		var value = isNaN(z) ? new THREE.Vector3(0, 0, 0) : new THREE.Vector3(x, y, z);
		return value;
	}

	// true => sensible image tile repeat...
	var graphGeometry = new THREE.ParametricGeometry(meshFunction, segments, segments, true);

	///////////////////////////////////////////////
	// calculate vertex colors based on Z values //
	///////////////////////////////////////////////
	graphGeometry.computeBoundingBox();
	zMin = graphGeometry.boundingBox.min.z;
	zMax = graphGeometry.boundingBox.max.z;
	zRange = zMax - zMin;

	var color = void 0;
	var point = void 0;
	var face = void 0;
	var numberOfSides = void 0;
	var vertexIndex = void 0;
	var faceIndices = ['a', 'b', 'c', 'd'];

	// first, assign colors to vertices as desired
	for (var i = 0; i < graphGeometry.vertices.length; i++) {
		point = graphGeometry.vertices[i];
		color = new THREE.Color(0x0000ff);
		color.setHSL(0.7 * (zMax - point.z) / zRange, 1, 0.5);
		graphGeometry.colors[i] = color; // use this array for convenience
	}

	// copy the colors as necessary to the face's vertexColors array.
	for (var _i = 0; _i < graphGeometry.faces.length; _i++) {
		face = graphGeometry.faces[_i];
		numberOfSides = face instanceof THREE.Face3 ? 3 : 4;
		for (var j = 0; j < numberOfSides; j++) {
			vertexIndex = face[faceIndices[j]];
			face.vertexColors[j] = graphGeometry.colors[vertexIndex];
		}
	}
	///////////////////////
	// end vertex colors //
	///////////////////////

	// material choices: vertexColorMaterial, wireMaterial , normMaterial , shadeMaterial

	if (graphMesh) scene.remove(graphMesh);

	wireMaterial.map.repeat.set(segments, segments);

	graphMesh = new THREE.Mesh(graphGeometry, vertexColorMaterial);
	graphMesh.side = THREE.DoubleSide;
	scene.add(graphMesh);

	function render() {
		renderer.render(scene, camera);
	}

	$scope.exporter = function () {
		console.time('file');
		var exporter = new THREE.OBJExporter();
		var model = LZMA.compress(exporter.parse(scene.children[3]), 9);

		/*const file = new FileReader();
  file.readAsDataURL(new Blob([model], { type: 'text/plain' }));*/

		//file.onload = () => {
		var data = {};
		// Se quita esto del archivo a enviar data:text/plain;base64,
		//data.model = file.result.substr(23);
		data.model = model;
		data.name = 'model';
		data.asignature = 'vectorial';
		$http.post('/createModel2', data, 'json').then(function (response) {
			console.timeEnd('file end');
			console.log('response', response);
		}, function (error) {
			console.log('error', error);
		});
		//};
	};
});

/***/ }),
/* 8 */
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('app', ['ngRoute']);

/***/ }),
/* 10 */
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
	}).when('/createModel2', {
		templateUrl: 'views/createModel2.html',
		controller: 'modelGenerateCtrl2'
	}).when('/testMarker', {
		templateUrl: 'views/testMarker.html',
		controller: 'testMarkerCtrl'
	}).when('/mathEditor', {
		templateUrl: 'views/mathEditor.html',
		controller: 'mathEditorCtrl'
	}).otherwise({
		redirectTo: '/'
	});
	$locationProvider.html5Mode(true);
}]);

console.log('router');

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Custom module for quilljs to allow user to drag images from their file system into the editor
 * and paste images from clipboard (Works on Chrome, Firefox, Edge, not on Safari)
 * @see https://quilljs.com/blog/building-a-custom-module/
 */
var ImageImport = exports.ImageImport = function () {
	function ImageImport(quill) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, ImageImport);

		// save the quill reference
		this.quill = quill;
		// bind handlers to this instance
		this.handleDrop = this.handleDrop.bind(this);
		this.handlePaste = this.handlePaste.bind(this);
		// listen for drop and paste events
		this.quill.root.addEventListener('drop', this.handleDrop, false);
		this.quill.root.addEventListener('paste', this.handlePaste, false);
	}

	_createClass(ImageImport, [{
		key: 'handleDrop',
		value: function handleDrop(evt) {
			evt.preventDefault();
			if (evt.dataTransfer && evt.dataTransfer.files && evt.dataTransfer.files.length) {
				this.readFiles(evt.dataTransfer.files, this.insert.bind(this));
			}
		}
	}, {
		key: 'handlePaste',
		value: function handlePaste(evt) {
			var _this = this;

			if (evt.clipboardData && evt.clipboardData.items && evt.clipboardData.items.length) {
				this.readFiles(evt.clipboardData.items, function (dataUrl) {
					var selection = _this.quill.getSelection();
					if (selection) {
						// we must be in a browser that supports pasting (like Firefox)
						// so it has already been placed into the editor
					} else {
						// otherwise we wait until after the paste when this.quill.getSelection()
						// will return a valid index
						setTimeout(function () {
							return _this.insert(dataUrl);
						}, 0);
					}
				});
			}
		}
	}, {
		key: 'insert',
		value: function insert(dataUrl) {
			var index = (this.quill.getSelection() || {}).index || this.quill.getLength();
			this.quill.insertEmbed(index, 'image', dataUrl, 'user');
		}
	}, {
		key: 'readFiles',
		value: function readFiles(files, callback) {
			// check each file for an image
			[].forEach.call(files, function (file) {
				if (!file.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i)) {
					// file is not an image
					// Note that some file formats such as psd start with image/* but are not readable
					return;
				}
				// set up file reader
				var reader = new FileReader();
				reader.onload = function (evt) {
					callback(evt.target.result);
				};
				// read the clipboard item or file
				var blob = file.getAsFile ? file.getAsFile() : file;
				if (blob instanceof Blob) {
					reader.readAsDataURL(blob);
				}
			});
		}
	}]);

	return ImageImport;
}();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Custom module for quilljs to allow user to resize <img> elements
 * (Works on Chrome, Edge, Safari and replaces Firefox's native resize behavior)
 * @see https://quilljs.com/blog/building-a-custom-module/
 */
var ImageResize = exports.ImageResize = function () {
	function ImageResize(quill) {
		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, ImageResize);

		// save the quill reference and options
		this.quill = quill;
		this.options = options;
		// bind handlers to this instance
		this.handleClick = this.handleClick.bind(this);
		this.handleMousedown = this.handleMousedown.bind(this);
		this.handleMouseup = this.handleMouseup.bind(this);
		this.handleDrag = this.handleDrag.bind(this);
		this.checkImage = this.checkImage.bind(this);
		// track resize handles
		this.boxes = [];
		// disable native image resizing on firefox
		document.execCommand('enableObjectResizing', false, 'false');
		// respond to clicks inside the editor
		this.quill.root.addEventListener('click', this.handleClick, false);
	}

	_createClass(ImageResize, [{
		key: 'handleClick',
		value: function handleClick(evt) {
			if (evt.target && evt.target.tagName && evt.target.tagName.toUpperCase() == 'IMG') {
				if (this.img === evt.target) {
					// we are already focused on this image
					return;
				}
				if (this.img) {
					// we were just focused on another image
					this.hide();
				}
				// clicked on an image inside the editor
				this.show(evt.target);
			} else if (this.img) {
				// clicked on a non image
				this.hide();
			}
		}
	}, {
		key: 'show',
		value: function show(img) {
			// keep track of this img element
			this.img = img;
			this.showResizers();
			this.showSizeDisplay();
			// position the resize handles at the corners
			var rect = this.img.getBoundingClientRect();
			this.positionBoxes(rect);
			this.positionSizeDisplay(rect);
		}
	}, {
		key: 'hide',
		value: function hide() {
			this.hideResizers();
			this.hideSizeDisplay();
			this.img = undefined;
		}
	}, {
		key: 'showResizers',
		value: function showResizers() {
			// prevent spurious text selection
			this.setUserSelect('none');
			// add 4 resize handles
			this.addBox('nwse-resize'); // top left
			this.addBox('nesw-resize'); // top right
			this.addBox('nwse-resize'); // bottom right
			this.addBox('nesw-resize'); // bottom left
			// listen for the image being deleted or moved
			document.addEventListener('keyup', this.checkImage, true);
			this.quill.root.addEventListener('input', this.checkImage, true);
		}
	}, {
		key: 'hideResizers',
		value: function hideResizers() {
			// stop listening for image deletion or movement
			document.removeEventListener('keyup', this.checkImage);
			this.quill.root.removeEventListener('input', this.checkImage);
			// reset user-select
			this.setUserSelect('');
			this.setCursor('');
			// remove boxes
			this.boxes.forEach(function (box) {
				return document.body.removeChild(box);
			});
			// release memory
			this.dragBox = undefined;
			this.dragStartX = undefined;
			this.preDragWidth = undefined;
			this.boxes = [];
		}
	}, {
		key: 'addBox',
		value: function addBox(cursor) {
			// create div element for resize handle
			var box = document.createElement('div');
			// apply styles
			var styles = {
				position: 'absolute',
				height: '12px',
				width: '12px',
				backgroundColor: 'white',
				border: '1px solid #777',
				boxSizing: 'border-box',
				opacity: '0.80',
				cursor: cursor
			};
			this.extend(box.style, styles, this.options.handleStyles || {});
			// listen for mousedown on each box
			box.addEventListener('mousedown', this.handleMousedown, false);
			// add drag handle to document
			document.body.appendChild(box);
			// keep track of drag handle
			this.boxes.push(box);
		}
	}, {
		key: 'extend',
		value: function extend(destination) {
			for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				sources[_key - 1] = arguments[_key];
			}

			sources.forEach(function (source) {
				for (var prop in source) {
					if (source.hasOwnProperty(prop)) {
						destination[prop] = source[prop];
					}
				}
			});
			return destination;
		}
	}, {
		key: 'positionBoxes',
		value: function positionBoxes(rect) {
			var _this = this;

			// set the top and left for each drag handle
			[{ left: rect.left - 6, top: rect.top - 6 }, // top left
			{ left: rect.left + rect.width - 6, top: rect.top - 6 }, // top right
			{ left: rect.left + rect.width - 6, top: rect.top + rect.height - 6 }, // bottom right
			{ left: rect.left - 6, top: rect.top + rect.height - 6 }].forEach(function (pos, idx) {
				_this.extend(_this.boxes[idx].style, {
					top: Math.round(pos.top + window.pageYOffset) + 'px',
					left: Math.round(pos.left + window.pageXOffset) + 'px'
				});
			});
		}
	}, {
		key: 'handleMousedown',
		value: function handleMousedown(evt) {
			// note which box
			this.dragBox = evt.target;
			// note starting mousedown position
			this.dragStartX = evt.clientX;
			// store the width before the drag
			this.preDragWidth = this.img.width || this.img.naturalWidth;
			// set the proper cursor everywhere
			this.setCursor(this.dragBox.style.cursor);
			// listen for movement and mouseup
			document.addEventListener('mousemove', this.handleDrag, false);
			document.addEventListener('mouseup', this.handleMouseup, false);
		}
	}, {
		key: 'handleMouseup',
		value: function handleMouseup() {
			// reset cursor everywhere
			this.setCursor('');
			// stop listening for movement and mouseup
			document.removeEventListener('mousemove', this.handleDrag);
			document.removeEventListener('mouseup', this.handleMouseup);
		}
	}, {
		key: 'handleDrag',
		value: function handleDrag(evt) {
			if (!this.img) {
				// image not set yet
				return;
			}
			// update image size
			if (this.dragBox == this.boxes[0] || this.dragBox == this.boxes[3]) {
				// left-side resize handler; draging right shrinks image
				this.img.width = Math.round(this.preDragWidth - evt.clientX - this.dragStartX);
			} else {
				// right-side resize handler; draging right enlarges image
				this.img.width = Math.round(this.preDragWidth + evt.clientX - this.dragStartX);
			}
			// reposition the drag handles around the image
			var rect = this.img.getBoundingClientRect();
			this.positionBoxes(rect);
			this.positionSizeDisplay(rect);
		}
	}, {
		key: 'setUserSelect',
		value: function setUserSelect(value) {
			var _this2 = this;

			['userSelect', 'mozUserSelect', 'webkitUserSelect', 'msUserSelect'].forEach(function (prop) {
				// set on contenteditable element and <html>
				_this2.quill.root.style[prop] = value;
				document.documentElement.style[prop] = value;
			});
		}
	}, {
		key: 'setCursor',
		value: function setCursor(value) {
			[document.body, this.img, this.quill.root].forEach(function (el) {
				return el.style.cursor = value;
			});
		}
	}, {
		key: 'checkImage',
		value: function checkImage() {
			if (this.img) {
				this.hide();
			}
		}
	}, {
		key: 'showSizeDisplay',
		value: function showSizeDisplay() {
			if (!this.options.displaySize) {
				return;
			}
			this.display = document.createElement('div');
			// apply styles
			var styles = {
				position: 'absolute',
				font: '12px/1.0 Arial, Helvetica, sans-serif',
				padding: '4px 8px',
				textAlign: 'center',
				backgroundColor: 'white',
				color: '#333',
				border: '1px solid #777',
				boxSizing: 'border-box',
				opacity: '0.80',
				cursor: 'default'
			};
			this.extend(this.display.style, styles, this.options.displayStyles || {});
			document.body.appendChild(this.display);
		}
	}, {
		key: 'hideSizeDisplay',
		value: function hideSizeDisplay() {
			document.body.removeChild(this.display);
			this.display = undefined;
		}
	}, {
		key: 'positionSizeDisplay',
		value: function positionSizeDisplay(rect) {
			if (!this.display || !this.img) {
				return;
			}
			var size = this.getCurrentSize();
			this.display.innerHTML = size.join(' &times; ');
			if (size[0] > 120 && size[1] > 30) {
				// position on top of image
				var dispRect = this.display.getBoundingClientRect();
				this.extend(this.display.style, {
					left: Math.round(rect.left + rect.width + window.pageXOffset - dispRect.width - 8) + 'px',
					top: Math.round(rect.top + rect.height + window.pageYOffset - dispRect.height - 8) + 'px'
				});
			} else {
				// position off bottom right
				this.extend(this.display.style, {
					left: Math.round(rect.left + rect.width + window.pageXOffset + 8) + 'px',
					top: Math.round(rect.top + rect.height + window.pageYOffset + 8) + 'px'
				});
			}
		}
	}, {
		key: 'getCurrentSize',
		value: function getCurrentSize() {
			return [this.img.width, Math.round(this.img.width / this.img.naturalWidth * this.img.naturalHeight)];
		}
	}]);

	return ImageResize;
}();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(1);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(4);

__webpack_require__(6);

__webpack_require__(7);

__webpack_require__(8);

__webpack_require__(5);

__webpack_require__(0);

/***/ })
/******/ ]);