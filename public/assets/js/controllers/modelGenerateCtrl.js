/* global angular, mathBox, THREE */

angular.module('app')
	.controller('modelGenerateCtrl', ($scope) => {
		$scope.hola = 'hola mundo';
		// se crea una instancia de mathBox
		const mathbox = mathBox({
			plugins: ['core', 'controls', 'cursor', 'mathbox'],
			controls: { klass: THREE.OrbitControls },
		});
		if (mathbox.fallback) throw 'WebGL not supported';

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

		view.grid({axes:[1,3], width: 2, divideX: 20, divideY: 20, opacity:0.25});
	});