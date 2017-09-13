angular.module('app', ['ngRoute', 'ngStorage', 'satellizer', 'ui.bootstrap'])
	.run(($http, $rootScope, $location) => {

		// $http.defaults.headers.common.Authorization = '';
		let scene;
		$rootScope.login = localStorage.getItem('token');

		/* Generate Marker */
		$rootScope.markers = [];
		$rootScope.entrada = '';
		/* Fin Generate Marker */

		/* Generar Grafica */
		$rootScope.path = $location.path();
		$rootScope.zFuncTextR = 'x^2 - y^2';
		$rootScope.customOption = {};
		$rootScope.customOption.x = {};
		$rootScope.customOption.y = {};
		$rootScope.customOption.z = {};
		$rootScope.customOption.x.min = -3;
		$rootScope.customOption.x.max = 3;
		$rootScope.customOption.y.min = -3;
		$rootScope.customOption.y.max = 3;
		$rootScope.customOption.z.min = -3;
		$rootScope.customOption.z.max = 3;
		$rootScope.customOption.planeSize = 6;
		$rootScope.customOption.planeSubdivition = 10;
		$rootScope.customOption.axisSize = 10;

		$rootScope.graph = (zFuncTextR, customOption) => {
			let graphMesh;
			const segments = 80;
			const xMin = customOption.x.min || -3;
			const xMax = customOption.x.max || 3;
			let xRange = xMax - xMin;
			const yMin = customOption.y.min || -3;
			const yMax = customOption.y.max || 3;
			let yRange = yMax - yMin;
			let zMin = customOption.z.min || -3;
			let zMax = customOption.z.min || 3;
			let zRange = zMax - zMin;


			const zFuncText = zFuncTextR || 'x^2 - y^2';
			let zFunc = Parser.parse(zFuncText).toJSFunction(['x', 'y']);

			scene = new THREE.Scene();
			scene.background = new THREE.Color(0xf0f0f0);


			/* Configuracion de la camara */
			const SCREEN_WIDTH = window.innerWidth;
			const SCREEN_HEIGHT = window.innerHeight;
			const VIEW_ANGLE = 45;
			const ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT;
			const NEAR = 0.1;
			const FAR = 20000;

			const camera = new THREE.PerspectiveCamera(
				VIEW_ANGLE,
				ASPECT,
				NEAR,
				FAR,
			);

			camera.position.set(2 * xMax, 0.5 * yMax, 4 * zMax);
			camera.up = new THREE.Vector3(0, 0, 1);
			camera.lookAt(scene.position);
			scene.add(camera);
			/* FIN de la Configuracion de la camara */

			/* control sobre la scena */
			const controls = new THREE.OrbitControls(camera, document.getElementById('scene'));
			controls.addEventListener('change', render);
			/* FIn control sobre la scena */

			/* Plano r3 */
			const helper = new THREE.GridHelper(customOption.planeSize, customOption.planeSubdivition);
			helper.rotateX(Math.PI / 2);
			helper.material.opacity = 0.25;
			helper.material.transparent = true;
			scene.add(helper);
			/* FIN de Plano r3 */

			/* Ejes XYZ */
			const axis = new THREE.AxisHelper(customOption.axisSize);
			scene.add(axis);
			/* FIN de Ejes XYZ */

			const renderer = new THREE.WebGLRenderer();
			renderer.setSize(window.innerWidth, window.innerHeight);

			const container = document.getElementById('scene');
			container.appendChild(renderer.domElement);
			camera.position.z = 5;

			const windowResize = THREEx.WindowResize(renderer, camera);
			windowResize.stop();
			// "wireframe texture"
			const wireTexture = new THREE.ImageUtils.loadTexture();
			wireTexture.wrapS = THREE.RepeatWrapping;
			wireTexture.wrapT = THREE.RepeatWrapping;
			wireTexture.repeat.set(40, 40);

			const wireMaterial = new THREE.MeshBasicMaterial({
				map: wireTexture,
				vertexColors: THREE.VertexColors,
				side: THREE.DoubleSide,
			});

			const vertexColorMaterial = new THREE.MeshBasicMaterial({
				vertexColors: THREE.VertexColors,
				side: THREE.DoubleSide,
			});

			renderer.setClearColor(0x888888, 1);

			xRange = xMax - xMin;
			yRange = yMax - yMin;
			zFunc = Parser.parse(zFuncText).toJSFunction(['x', 'y']);

			function meshFunction(a, b) {
				const x = (xRange * a) + xMin;
				const y = (yRange * b) + yMin;
				const z = zFunc(x, y);

				const value = isNaN(z) ?
				new THREE.Vector3(0, 0, 0) :
				new THREE.Vector3(x, y, z);
				return (value);
			}

			// true => sensible image tile repeat...
			const graphGeometry = new THREE.ParametricGeometry(
				meshFunction,
				segments,
				segments,
				true,
			);

			///////////////////////////////////////////////
			// calculate vertex colors based on Z values //
			///////////////////////////////////////////////
			graphGeometry.computeBoundingBox();
			zMin = graphGeometry.boundingBox.min.z;
			zMax = graphGeometry.boundingBox.max.z;
			zRange = zMax - zMin;

			let color;
			let point;
			let face;
			let numberOfSides;
			let vertexIndex;
			const faceIndices = ['a', 'b', 'c', 'd'];

			// first, assign colors to vertices as desired
			for (let i = 0; i < graphGeometry.vertices.length; i++) {
				point = graphGeometry.vertices[i];
				color = new THREE.Color(0x0000ff);
				color.setHSL((0.7 * (zMax - point.z)) / zRange, 1, 0.5);
				graphGeometry.colors[i] = color; // use this array for convenience
			}

			// copy the colors as necessary to the face's vertexColors array.
			for (let i = 0; i < graphGeometry.faces.length; i++) {
				face = graphGeometry.faces[i];
				numberOfSides = (face instanceof THREE.Face3) ? 3 : 4;
				for (let j = 0; j < numberOfSides; j++) {
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

			graphMesh = new THREE.Mesh(
				graphGeometry,
				vertexColorMaterial,
			);
			graphMesh.side = THREE.DoubleSide;
			scene.add(graphMesh);

			function render() {
				renderer.render(scene, camera);
			}

		};

		$rootScope.exporter = () => {
			console.time('file');
			const exporter = new THREE.OBJExporter();
			const model = LZMA.compress(exporter.parse(scene.children[3]), 3);
			const data = {};

			data.model = model;
			data.name = 'model';
			data.asignature = 'vectorial';
			$http.post('/createModel2', data, 'json')
				.then((response) => {
					console.timeEnd('file end');
					console.log('response', response);
				}, (error) => {
					console.log('error', error);
				});
		};
		/* FIN de Generar Grafica */

		$rootScope.logout = () => {
			localStorage.clear();
		};

		/* Generate Marker */

		$rootScope.buildMarker = (imageQr) => {
			THREEx.ArPatternFile.buildFullMarker(imageQr, function onComplete(markerUrl) {
				const newMarker = {};
				newMarker.imageQr = imageQr;
				newMarker.imageSrc = markerUrl;
				$rootScope.markers.unshift(newMarker);
				$rootScope.$apply();
				
				// $scope.pattFileGenerate(imageQr, markerImage);
			});
		};

		$rootScope.pattFileGenerate = (imageQr, markerGenerated) => {
			if (imageQr !== null &&
				imageQr !== undefined &&
				markerGenerated !== null &&
				markerGenerated !== undefined) {
				THREEx.ArPatternFile.encodeImageURL(imageQr, (patternFileString) => {
					const file = new FileReader();
					file.readAsDataURL(new Blob( [patternFileString], { type: 'text/plain' } ));
					file.onload = () => {
						const data = {};
						// Se quita esto del archivo a enviar data:text/plain;base64,
						data.pattFile = file.result.substr(23);
						data.pattFileImage = markerGenerated.src.substr(21);
						data.name = 'gregory';
						data.asignature = 'vectorial';
						$http.post('/createMarker', data, 'json')
							.then((response) => {
								console.log('response', response);
							}, (error) => {
								console.log('error', error);
							});
					};
				});
			}
		};

		$rootScope.markerGenerate = () => {
			/* se genera el codigo QR */
			$http.get('createMarker')
				.then((data) => {
					const container = document.createElement('div');
					const qrcode = new QRCode(container, {
						text: data.data.time.now,
						width: 256,
						height: 256,
						colorDark: '#000000',
						colorLight: '#ffffff',
					});
					const canvasImg = container.querySelector('canvas');
					const image = canvasImg.toDataURL('image/png');
					$rootScope.buildMarker(image);
				})
				.catch(e => console.error(e.stack));


		};

		$rootScope.makerDelete = () => {
			$rootScope.markers = $rootScope.markers.filter((obj) => {
				if (!angular.isDefined(obj.check) || !obj.check) {
					return (obj);
				}
			});
		};
		/* FIN de Generate Marker */
	});