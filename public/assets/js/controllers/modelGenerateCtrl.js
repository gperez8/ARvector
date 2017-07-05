/* global angular, mathBox, THREE */

angular.module('app')
	.controller('modelGenerateCtrl', ($scope) => {
		$scope.hola = 'hola mundo';
		// se crea una instancia de mathBox
		const mathbox = mathBox({
			plugins: ['core', 'controls', 'cursor', 'mathbox'],
			controls: { klass: THREE.OrbitControls },
		});
		if (mathbox.fallback) throw new Error('WebGL not supported');

		// se crea una variable three para acceder a los metodos
		// three.renderer, three.scene, three.camera
		const three = mathbox.three;

		// limpia el color de la escena y lo coloca en blanco
		three.renderer.setClearColor(new THREE.Color(0xFFFFFF), 1.0);

		three.camera = mathbox.camera({
			proxy: true,
			position: [0, 0, 3],
		});

		const view = mathbox.cartesian({
			range: [[-3, 3], [-3, 3], [-3, 3]],
			scale: [2, 1, 2],
		});

		// Caracteristicas del eje X
		view.axis({ axis: 1, width: 8, detail: 40, color: 'red' });
		const xScale = view.scale({ axis: 1, divide: 10, nice: true, zero: true });
		view.ticks({ width: 5, size: 15, color: 'red', zBias: 2 });
		const xFormat = view.format({ digits: 2, font: 'Arial', weight: 'bold', style: 'normal', source: xScale });
		view.label({ color: 'red', zIndex: 0, offset: [0, -20], points: xScale, text: xFormat });

		// Caracteristicas del eje Y
		view.axis({ axis: 3, width: 8, detail: 40, color: 'green' });
		const yScale = view.scale({ axis: 3, divide: 5, nice: true, zero: false });
		view.ticks({ width: 5, size: 15, color: 'green', zBias: 2 });
		const yFormat = view.format({ digits: 2, font: 'Arial', weight: 'bold', style: 'normal', source: yScale });
		view.label({ color: 'green', zIndex: 0, offset: [0, 0], points: yScale, text: yFormat });

		// Caracteristicas del eje Z
		view.axis({ axis: 2, width: 8, detail: 40, color: 'blue' });
		const zScale = view.scale({ axis: 2, divide: 5, nice: true, zero: false });
		view.ticks({ width: 5, size: 15, color: 'blue', zBias: 2 });
		const zFormat = view.format({ digits: 2, font: 'Arial', weight: 'bold', style: 'normal', source: zScale });
		view.label({ color: 'blue', zIndex: 0, offset: [0, 0], points: zScale, text: zFormat });

		view.grid({ axes: [1, 3], width: 2, divideX: 20, divideY: 20, opacity: 0.25 });


		const graphData = view.area({
			axes: [1, 3],
			channels: 3,
			width: 64,
			height: 64,
			expr: function (emit, x, y, i, j, t) {
				var z = x * y;
				emit(x, z, y);
			},
		});

		// actuall emitter set later.
		const graphColors = view.area({
			expr: function (emit, x, y, i, j, t) {
				if (x < 0) {
					emit(1.0, 0.0, 0.0, 1.0);
				} else {
					emit(0.0, 1.0, 0.0, 1.0);
				}
			},
			axes: [1, 3],
			width: 64,
			height: 64,
			channels: 4, // RGBA
		});

		const graphShaded = false;
		const graphViewSolid = view.surface({
			points: graphData,
			color: '#FFFFFF',
			shaded: false,
			fill: true,
			lineX: false,
			lineY: false,
			colors: graphColors,
			visible: true,
			width: 0,
		});

		const graphWireVisible = true;
		const graphViewWire = view.surface({
			points: graphData,
			color: '#000000',
			shaded: false,
			fill: false,
			lineX: true,
			lineY: true,
			visible: graphWireVisible,
			width: 2,
		});

		var functionText = '(x)^2 - (y)^2';
		var a = 1, b = 1;
		var xMin = -3, xMax = 3, yMin = -3,	yMax = 3, zMin = -3, zMax = 3;

		const zAutofit = true;

		// start of updateGraph function ==============================================================
		const updateGraphFunc = function() {
			const zFunc = Parser.parse(functionText).toJSFunction(['x', 'y']);
			graphData.set('expr',function (emit, x, y, i, j, t) {
				emit( x, zFunc(x,y), y );
			});

			if (zAutofit) {
				const xStep = (xMax - xMin) / 256;
				const yStep = (yMax - yMin) / 256;
				let zSmallest = zFunc(xMin, yMin);
				let zBiggest  = zFunc(xMin, yMin);
				for (let x = xMin; x <= xMax; x += xStep) {
					for (let y = yMin; y <= yMax; y += yStep) {
						const z = zFunc(x,y);
						if (z < zSmallest) zSmallest = z;
						if (z > zBiggest) zBiggest  = z;
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
		}

		updateGraphFunc();
	});
