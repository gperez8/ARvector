 /* global angular, document, THREEx, pdfMake */

angular.module('app')
	.controller('markerGenerateCtrl', ($scope, $http) => {
		$scope.entrada = '';
		$scope.imageQr = '';
		$scope.markerGenerated = '';

		$scope.buildMarker = (imageQr) => {
			THREEx.ArPatternFile.buildFullMarker(imageQr, function onComplete(markerUrl) {
				const markerImage = document.createElement('img');
				markerImage.src = markerUrl;

				const container = document.querySelector('#qr');
				while (container.firstChild) container.removeChild(container.firstChild);
				container.appendChild(markerImage);
				$scope.markerGenerated = markerImage;
				// $scope.pattFileGenerate(imageQr, markerImage);
			});
		};

		$scope.pattFileGenerate = (imageQr, markerGenerated) => {
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
			$scope.imageQr = image;
			$scope.buildMarker(image);
		};

		$scope.generatePdf = () => {
			const docDefinition = {
				content: [
					{
						image: $scope.markerGenerated.src,
						width: 300,
						alignment: 'center',
					},
				],
			};
			pdfMake.createPdf(docDefinition).open();
		};
	});
