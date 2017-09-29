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

		console.log('name', req.body.name);

		const file = req.body.pattFile;
		const img = req.body.pattFileImage;

		// carpetas para archivos .patt y png
		const pattFileDir = req.body.pattFileDir;
		const imgFileDir = req.body.imgFileDir;

		// ruta y nombres de archivos .patt y png
		const pattFilePath = `${pattFileDir}` +
			`${req.body.name}` +
			'.patt';

		const imgFilePath = `${imgFileDir}` +
			`${req.body.name}` +
			'.png';

		fs.writeFile(pattFilePath, new Buffer(file, 'base64'), 'ascii', (err) => {
			if (err) return console.log(`error al escribir archivo (.patt) ${err}`);
			console.log('The file was succesfully saved!');
		});

		fs.writeFile(imgFilePath, new Buffer(img, 'base64'), 'ascii', (err) => {
			if (err) return console.log(`error al escribir archivo (.patt) ${err}`);
			console.log('The file IMG was succesfully saved!');
		});

		console.log('pattFilePath', pattFilePath);

		res.status('200').json({ 
			status: 200, 
			newMarker : {
				imgFilePath: imgFilePath.replace('./public/assets/', 'src/'),
				pattFilePath: pattFilePath.replace('./public/assets/', 'src/'),
				pattFileDir: pattFilePath,
				imgFileDir: imgFilePath,
			},
		});
	});

httpRequestHandling.route('/createMarker/:id')
	.post((req, res) => {
		const pattFile = {};
		const imgFile = {};

		const pattFileDir = req.body.pattFileDir;
		const imgFileDir = req.body.imgFileDir;
		let response = [];

		pattFile.pathClient = imgFileDir.replace('./public/assets/', 'src/');
		pattFile.pathServer = imgFileDir;
		pattFile.pattFiles = fs.readdirSync(pattFileDir);

		imgFile.pathClient = imgFileDir.replace('./public/assets/', 'src/');
		imgFile.pathServer = imgFileDir;
		imgFile.pattFiles = fs.readdirSync(imgFileDir);

		response.push(pattFile);
		response.push(imgFile);
		res.status(200).json(response);
	})
	.delete((req, res) => {
		const deleteToModel = req.body.path;
		deleteToModel.map((obj) => {
			fs.unlink(obj.pattFileDir, (error) => {
				if (error) {
					return res.status(500).json({ success: false, error: error });
				}
			});

			fs.unlink(obj.imgFileDir, (error) => {
				if (error) {
					return res.status(500).json({ success: false, error: error });
				}
			});
		});
		res.status(200).json({ success: true, status:200 });
	});

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

		fs.writeFile(modelFilePath, model, 'ascii', (err, data) => {
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


httpRequestHandling.route('/model')
	.post(multipartyMiddleware, FileUploadController.uploadFile)

httpRequestHandling.route('/model/:id')
	.post((req, res) => {
		const path = req.body.path;
		fs.readdir(path, (err, files) => {
			res.status(200).json({
				status: 200,
				pathFilesName: files,
				pathClient: path.replace('./public/assets/', 'src'),
				pathServer: path,
			});
		});
	});

httpRequestHandling.route('/model/:id')
	.delete((req, res) => {
		const deleteToModel = req.body.path;
		deleteToModel.map((obj) => {
			fs.unlink(obj.deleteSrc, (error) => {
				if (error) {
					return res.status(500).json({ success: false, error: error });
				}
			});
		});
		res.status(200).json({ success: true, status:200 });
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