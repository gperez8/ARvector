const express = require('express');
const fs = require('fs');

const httpRequestHandling = express();

httpRequestHandling.route('/createMarker')
	.post((req, res) => {
		const file = req.body.pattFile;
		const img = req.body.pattFileImage;

		// carpetas para archivos .patt y png
		const pattFileDir = './public/assets/' +
			`${req.body.asignature}` +
			'/pattern-files';

		const imgFileDir = './public/assets/' +
			`${req.body.asignature}` +
			'/pattern-images';

		// ruta y nombres de archivos .patt y png
		const pattFilePath = `${pattFileDir}` +
			'/' +
			`${req.body.name}` +
			'.patt';

		const imgFilePath = `${imgFileDir}` +
			'/' +
			`${req.body.name}` +
			'.png';

		if (!fs.existsSync(pattFileDir)) fs.mkdirSync(pattFileDir);
		if (!fs.existsSync(imgFileDir)) fs.mkdirSync(imgFileDir);

		fs.writeFile(pattFilePath, new Buffer(file, 'base64'), 'ascii', (err) => {
			if (err) return console.log(`error al escribir archivo (.patt) ${err}`);
			console.log('The file was succesfully saved!');
		});

		fs.writeFile(imgFilePath, new Buffer(img, 'base64'), 'ascii', (err) => {
			if (err) return console.log(`error al escribir archivo (.patt) ${err}`);
			console.log('The file IMG was succesfully saved!');
		});

		res.send('200');
	});

module.exports = httpRequestHandling;
