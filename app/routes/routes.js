const express = require('express');
const fs = require('fs');
const obj2gltf = require('../../lib/obj2gltf/');
const lzma = require('lzma');
const auth = require('./auth');
const middleware = require('./middleware');
const multiparty = require('connect-multiparty');
const FileUploadController = require('./FileUploadController');

const multipartyMiddleware = multiparty();
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
	})
	/*.get((req, res) => {
           middleware.ensureAuthenticated(req, res);
      });*/

httpRequestHandling.route('/createModel2')
	.post((req, res) => {
		const model = lzma.decompress(req.body.model);
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

		fs.writeFile(modelFilePath, model, 'ascii', (err,data) => {
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
				kmc: { doubleSided: true },
				optimize: true,
				outputUpAxis: ['X', 'Y', 'Z'],
			};

			obj2gltf(modelFilePath, modelGltfFilePath, options)
				.then(function() {
					console.log('Converted model');
					/*fs.readFile(modelGltfFilePath, (err, data) => {
						const file = new Buffer(data, 'Uint8array');
						const compressFile = lzma.compress(file, 9);
					
						fs.writeFile(modelFilePath+'.lzma', compressFile, 'ascii', (err) => {
							if (err) {
								res.status(500);
								res.send({
									error: {
										message: err.message,
										stack: err.stack,
									},
								});
								return console.log('compress lzma');
							}
						});


						const result2 = lzma.decompress(result1);
						console.log('result2', result2);
					});*/
					fs.unlink(modelFilePath, function(error) {
                        if (error) {
                            throw error;
                        }
                        console.log('Deleted file .obj');
                    });
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

//router.post('/importModel', multipartyMiddleware, FileUploadController.uploadFile);

httpRequestHandling.route('/importModel')
	.post(multipartyMiddleware, FileUploadController.uploadFile)
	.get((req, res) => {
		console.log('req', req);
	});

httpRequestHandling.route('/model')
	.post((req, res) => {
		fs.readdir('./public/assets/model/', (err, files) => {
            return res.json({ status: 200, pathFilesName: files, path: '/public/assets/model/' });
        });
	});

httpRequestHandling.route('/signup')
	.post((req, res) => {
		auth.emailSignup(req, res);
	});

/*httpRequestHandling.route('/login')
	.post((req, res) => {
		auth.emailLogin(req, res);
	});*/

module.exports = httpRequestHandling;