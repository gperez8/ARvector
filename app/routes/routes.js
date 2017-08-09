const express = require('express');
const fs = require('fs');
const obj2gltf = require('../../lib/obj2gltf/');

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

httpRequestHandling.route('/createModel2')
	.post((req, res) => {
		const model = req.body.model;

		// carpetas para archivos .patt y png
		const modelFileDir = './public/assets/model';

		// ruta y nombres de archivos .patt y png
		const modelFilePath = `${modelFileDir}` +
			'/' +
			`${req.body.name}` +
			'.obj';

		const modelGltfFilePath = `${modelFileDir}` +
			'/' +
			`${req.body.name}` +
			'.gltf';

		fs.writeFile(modelFilePath, new Buffer(model, 'base64'), 'ascii', (err) => {
			if (err) {
			  res.status(500);
			  res.send({
			    error: {
			      message: err.message,
			      stack: err.stack,
			    },
			  });
			  return console.log(`error al escribir archivo (.patt) ${err}`);
		  }

			console.log('The file was succesfully saved!');

		  const options = {
			  separateTextures: true,
			  kmc: { "doubleSided": true },
			  optimize: true,
			  outputUpAxis: ['X', 'Y', 'Z'],
		  };

      console.log(modelFilePath);
      console.log(modelGltfFilePath);

      	console.log('obj2gltf.defaults',obj2gltf.defaults);

		  obj2gltf(modelFilePath, modelGltfFilePath, options)
			  .then(function() {
				  console.log('Converted model');
    		  res.send('200'); // Mover la respuesta dentro del `then`, porque las promesas son asíncronas.
			  })
        .catch(function(err) {
			    res.status(500);
			    res.send({
			      error: {
			        message: err.message,
			        stack: err.stack,
			      },
			    });

          console.error(err);
        });
		});
	});

module.exports = httpRequestHandling;