/* global angular, document, THREE, Parser, window*/

angular.module('app')
	.controller('modelGenerateCtrl2', ($scope, $http) => {
		let graphMesh;
		const segments = 60;
		const xMin = -3;
		const xMax = 3;
		let xRange = xMax - xMin;
		const yMin = -3;
		const yMax = 3;
		let yRange = yMax - yMin;
		let zMin = -3;
		let zMax = 3;
		let zRange = zMax - zMin;

		const zFuncText = 'sin(x^2 + y^2)';
		let zFunc = Parser.parse(zFuncText).toJSFunction(['x', 'y']);

		const scene = new THREE.Scene();
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
		const controls = new THREE.OrbitControls(camera);
		controls.addEventListener('change', render);
		/* FIn control sobre la scena */

		/* Plano r3 */
		const helper = new THREE.GridHelper(6, 10);
		helper.rotateX(Math.PI / 2);
		helper.material.opacity = 0.25;
		helper.material.transparent = true;
		scene.add(helper);
		/* FIN de Plano r3 */

		/* Ejes XYZ */
		const axis = new THREE.AxisHelper(10);
		scene.add(axis);
		/* FIN de Ejes XYZ */

		const renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
		camera.position.z = 5;

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

		$scope.exporter = () => {
			const exporter = new THREE.OBJExporter();
			let model = exporter.parse(scene.children[3]);
			const file = new FileReader();
			file.readAsDataURL(new Blob([model], { type: 'text/plain' }));

			file.onload = () => {
				const data = {};
				// Se quita esto del archivo a enviar data:text/plain;base64,
				data.model = file.result.substr(23);
				data.name = 'model';
				data.asignature = 'vectorial';
				$http.post('/createModel2', data, 'json')
					.then((response) => {
						console.log('response', response);
					}, (error) => {
						console.log('error', error);
					});
			};
		};
	});
