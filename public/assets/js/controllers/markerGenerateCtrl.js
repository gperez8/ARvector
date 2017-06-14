 /* global $, angular, document */

angular.module('app')
	.controller('markerGenerateCtrl', function($scope) {

		$scope.entrada = 'hola';

		/* Se Genera el canvas donde se dibujará */
		const canvas = document.createElement('canvas');
		canvas.width = 512;
		canvas.height = 512;
		canvas.style.width = '512px';
		canvas.style.height = '512px';
		document.querySelector('#qr').appendChild(canvas);
		const context = canvas.getContext('2d');


		const imageMarker = new Image();
		imageMarker.src = 'src/images/markers/HIRO.jpg';
		imageMarker.onload = () => {
			context.drawImage(imageMarker, 20, 20, canvas.width,
			canvas.height);
		};

		const container = document.createElement('div');
		const qrcode = new QRCode(container, {
			text: $scope.entrada,
			width: 256,
			height: 256,
			colorDark: '#000000',
			colorLight: '#ffffff',
            // correctLevel : QRCode.CorrectLevel.H
        });

		const qrCodeImage = container.querySelector('img');
		qrCodeImage.addEventListener('load', () => {
			context.drawImage(qrCodeImage, canvas.width * 0.51,
				canvas.height * 0.30, canvas.width * 0.15, canvas.height * 0.15);
		});
	});
