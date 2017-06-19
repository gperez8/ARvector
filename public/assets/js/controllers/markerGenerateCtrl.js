 /* global angular, document, THREEx */

angular.module('app')
	.controller('markerGenerateCtrl', ($scope, $http) => {
		$scope.entrada = '';

		$scope.buildMarker = (image) => {
			THREEx.ArPatternFile.buildFullMarker(image, function onComplete(markerUrl) {
				const markerImage = document.createElement('img');
				markerImage.src = markerUrl;

				const container = document.querySelector('#qr');
				while (container.firstChild) container.removeChild(container.firstChild);
				container.appendChild(markerImage);
				// $scope.pattFileGenerate(image);
			});
		};

		$scope.pattFileGenerate = (image) => {
			THREEx.ArPatternFile.encodeImageURL(image, (patternFileString) => {
				let file = new FileReader();
				file.readAsDataURL(new Blob( [patternFileString], { type: 'text/plain' } ));
				file.onload = () => {
					const data = {};

					// Se quita esto del archivo a enviar data:text/plain;base64
					file = file.result.substr(22);
					data.file = file;

					$http.post('/createMarker', data, 'json')
						.then((response) => {
							console.log('response', response);
						}, (error) => {
							console.log('error', error);
						});
				};
			});
		};

		$scope.markerGenerate = () => {
			/* se genera el codigo QR */
			const container = document.createElement('div');
			const qrcode = new QRCode(container, {
				text: $scope.entrada,
				width: 256,
				height: 256,
				colorDark: '#000000',
				colorLight: '#ffffff',
			});

			/* Se dibuja el codigo QR sobre la imagen base */
			const canvasImg = container.querySelector('canvas');
			const image = canvasImg.toDataURL('image/png');
			$scope.buildMarker(image);
		};
	});
