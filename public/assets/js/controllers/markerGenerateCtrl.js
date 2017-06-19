 /* global angular, document, THREEx */

angular.module('app')
	.controller('markerGenerateCtrl', ($scope) => {
		$scope.entrada = 'gregory';
		$scope.updateFullMarkerImage = (image) => {
			THREEx.ArPatternFile.buildFullMarker(image, function onComplete(markerUrl) {
				const fullMarkerImage = document.createElement('img');
				fullMarkerImage.src = markerUrl;

				// put fullMarkerImage into #imageContainer
				const container = document.querySelector('#qr');
				while (container.firstChild) container.removeChild(container.firstChild);
				container.appendChild(fullMarkerImage);

				THREEx.ArPatternFile.encodeImageURL(image, function onComplete(patternFileString) {
					let file = new FileReader();

					file.readAsDataURL(new Blob([patternFileString], {type: 'text/plain'}));
					file.onload = () => {

						// Se quita esto del archivo a enviar
						// data:text/plain;base64
						file = file.result.substr(22);
						const data = {};
						data.file = file;

						$.ajax({
							type: 'POST',
							url: '/createMarker',
							data: data,
							dataType: 'json',
						});
					};

					// THREEx.ArPatternFile.triggerDownload(patternFileString);
				}); 
			});
		};

		/* se genera el codigo QR */
		const container = document.createElement('div');
		const qrcode = new QRCode(container, {
			text: $scope.entrada,
			width: 256,
			height: 256,
			colorDark: '#000000',
			colorLight: '#ffffff',
            // correctLevel : QRCode.CorrectLevel.H
		});

		/* Se dibuja el codigo QR sobre la imagen base */
		const canvasImg = container.querySelector('canvas');
		const image = canvasImg.toDataURL('image/png');
		$scope.updateFullMarkerImage(image);
	});
