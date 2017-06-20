const express = require('express');
const fs = require('fs');

const httpRequestHandling = express();

httpRequestHandling.route('/createMarker')
	.post((req, res) => {
		const file = req.body.file;
		const dir = './public/assets/' + `${req.body.asignature}`;
		const filepath = 'public/assets/' + `${req.body.asignature}` + '/' + `${req.body.name}` + '.patt';

		if (!fs.existsSync(dir)) fs.mkdirSync(dir);

		fs.writeFile(filepath, new Buffer(file, 'base64'), 'ascii', (err) => {
			if (err) return console.log(`error al escribir archivo (.patt) ${err}`);
			console.log('The file was succesfully saved!');
			res.send('200');
		});
	});

module.exports = httpRequestHandling;
