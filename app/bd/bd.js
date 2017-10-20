const fs = require('fs');
const { Pool, Client } = require('pg');
const httpRequestHandling = require('../routes/routes');
const service = require('../routes/service');

const client = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'arvector',
	password: 'C375035E',
	port: 5432,
});

client.connect();
client.on('end', () => { client.end(); });
/* CRUD TABLA career*/
httpRequestHandling.route('/career')
	.post((req, resp) => {
		const text = 'INSERT INTO bd.career(code_career,school) VALUES ($1,$2)';
		const values = ['0006', 'X'];

		client.query(text, values, (err) => {
			if (err) {
				console.log('err', err);
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.get((req, resp) => {
		const text = 'select * from bd.career';

		client.query(text, (err, res) => {
			if (err) {
				console.log('err', err.stack);
				return resp.status(500).json({ success: false, res: err });
			} 
			return resp.json({ success: true, res: res.rows });
		});
	})
	.patch((req, resp) => {
		
		const text = 'UPDATE bd.career SET school=($1) WHERE code_career=($2)';
		const values = ['Y', '0006'];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.delete((req, resp) => {
		
		const text = 'DELETE FROM bd.career WHERE code_career=($1)';
		const values = ['0006'];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	});
/* FIN de CRUD TABLA CARRERA*/

/* CRUD TABLA careerStudent*/
httpRequestHandling.route('/careerStudent')
	.post((req, resp) => {
		

		const text = 'INSERT INTO bd.careerStudent(code_career,ci_student) VALUES ($1,$2)';
		const values = ['0006', '20242434'];

		client.query(text, values, (err) => {
			if (err) {
				console.log('err', err);
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.get((req, resp) => {
		const text = 'select * from bd.careerStudent';

		client.query(text, (err, res) => {
			if (err) {
				console.log('error', err.stack);
				return resp.status(500).json({ success: false, res: err });
			} 
			return resp.json({ success: true, res: res.rows });
		});
	})
	.patch((req, resp) => {
		
		const text = 'UPDATE bd.careerStudent SET ci_student=($1) WHERE code_career=($2) and ci_student=($3)';
		const values = ['169247475','0006','20242434'];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.delete((req, resp) => {
		
		const text = 'DELETE FROM bd.careerStudent WHERE code_career=($1) and ci_student =($2)';
		const values = ['0006', '169247475'];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	});
/* FIN CRUD TABLA careerStudent*/

/* CRUD TABLA careerAsignature*/
httpRequestHandling.route('/careerAsignature')
	.post((req, resp) => {
		

		const text = 'INSERT INTO bd.careerAsignature(code_career,code_asignature) VALUES ($1,$2)';
		const values = ['0006', '99571901499'];

		client.query(text, values, (err) => {
			if (err) {
				console.log('err', err);
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.get((req, resp) => {
		const text = 'select * from bd.careerAsignature';

		client.query(text, (err, res) => {
			if (err) {
				console.log('err', err.stack);
				return resp.status(500).json({ success: false, res: err });
			} 
			return resp.json({ success: true, res: res.rows });
		});
	})
	.patch((req, resp) => {
		

		const text = 'UPDATE bd.careerAsignature SET code_asignature=($1) WHERE code_career=($2) and code_asignature=($3)';
		const values = ['45357565099', '0006', '99571901499'];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.delete((req, resp) => {
		
		const text = 'DELETE FROM bd.careerAsignature WHERE code_career=($1) and code_asignature=($2)';
		const values = ['0006', '45357565099'];

		
		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	});
/* FIN CRUD TABLA careerAsignature*/

/*---------------------------------------------*/

/* CRUD TABLA teacher*/
httpRequestHandling.route('/teacher')
	.post((req, resp) => {
		const text = 'INSERT INTO bd.teacher(name,last_name,ci,email,phone) VALUES ($1,$2,$3,$4,$5)';
		const values = ['carmen', 'araque', '21065369', 'cdaraque@gmail.com', '04244180652'];

		client.query(text, values, (err) => {
			if (err) {
				console.log('err', err);
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.get((req, resp) => {
		const text = 'select * from bd.teacher';

		client.query(text, (err, res) => {
			if (err) {
				console.log('err', err.stack);
				return resp.status(500).json({ success: false, res: err });
			} 
			return resp.json({ success: true, res: res.rows });
		});
	})
	.patch((req, resp) => {
		

		const text = 'UPDATE bd.teacher SET name=($1), last_name=($2) WHERE ci=($3)';
		const values = ['Carmen', 'Araque', '21065369'];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.delete((req, resp) => {
		
		const text = 'DELETE FROM bd.teacher WHERE ci=($1)';
		const values = ['21065369'];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	});
/* FIN CRUD TABLA teacher*/

/* CRUD TABLA student*/
httpRequestHandling.route('/student')
	.post((req, resp) => {		
		

		const text = 'INSERT INTO bd.student(name,last_name,ci,semester,email,phone) VALUES ($1,$2,$3,$4,$5,$6)';
		//const values = ['carmen', 'araque', '21065987', '9', 'cdaraque@gmail.com',''];
		const values = Object.keys(req.body).map(key => req.body[key]);


		client.query(text, values, (err) => {
			if (err) {
				console.log('err', err);
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.get((req, resp) => {
		const text = 'select * from bd.student';

		client.query(text, (err, res) => {
			if (err) {
				console.log('err', err.stack);
				return resp.status(500).json({ success: false, res: err });
			} 
			return resp.json({ success: true, res: res.rows });
		});
	})
	.patch((req, resp) => {
		

		const text = 'UPDATE bd.student SET name=($1), last_name=($2) WHERE ci=($3)';
		const values = ['Carmen', 'Araque', '21065987'];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.delete((req, resp) => {
		
		const text = 'DELETE FROM bd.student WHERE ci=($1)';
		const values = ['21065987'];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	});
/* FIN CRUD TABLA student*/


/* CRUD TABLA section*/
httpRequestHandling.route('/section')
	.post((req, resp) => {
		

		const text = 'INSERT INTO bd.section(ci_teacher,ci_student,code_asignature,num_section,schedule) VALUES ($1,$2,$3,$4,$5)';
		const values = ['007539372', '20242434', '18615945399','02','dfjsdjfkdsjlkf'];

		client.query(text, values, (err) => {
			if (err) {
				console.log('err', err);
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.get((req, resp) => {
		const text = 'select * from bd.section';

		client.query(text, (err, res) => {
			if (err) {
				console.log('err', err.stack);
				return resp.status(500).json({ success: false, res: err });
			} 
			return resp.json({ success: true, res: res.rows });
		});
	})
	.patch((req, resp) => {
		

		/*
		code_asignature,num_section,schedule*/

		const text = 'UPDATE bd.section SET num_section=($1) WHERE ci_teacher=($2) and ci_student=($3) and num_section=($4)';
		const values = ['03', '007539372', '20242434', '02'];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.delete((req, resp) => {
		
		const text = 'DELETE FROM bd.section WHERE ci_teacher=($1) and ci_student=($2) and num_section=($3)';
		const values = ['007539372', '20242434', '03'];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	});
/* FIN CRUD TABLA section*/

/*---------------------------------------------*/

/* CRUD TABLA Asignature */
httpRequestHandling.route('/asignature')
	.post((req, resp) => {
		const text = 'INSERT INTO bd.asignature(name, code_asignature) VALUES ($1,$2)';
		const values = ['IA', '20369852147'];

		client.query(text, values, (err) => {
			if (err) {
				console.log('err', err);
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.get((req, resp) => {
		const text = 'select * from bd.asignature';

		client.query(text, (err, res) => {
			if (err) {
				console.log('err', err.stack);
				return resp.status(500).json({ success: false, res: err });
			} 
			return resp.json({ success: true, res: res.rows });
		});
	})
	.patch((req, resp) => {
		const text = 'UPDATE bd.asignature SET name=($1) WHERE code_asignature=($2)';
		const values = ['ai','20369852147'];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.delete((req, resp) => {
		const text = 'DELETE FROM bd.asignature WHERE code_asignature=($1)';
		const values = ['20369852147'];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	});
/* FIN CRUD TABLA Asignature*/

/* CRUD TABLA teacherAsignature */
httpRequestHandling.route('/teacherAsignature')
	.post((req, resp) => {
		const text = 'INSERT INTO bd.teacherAsignature(ci_teacher, code_asignature) VALUES ($1,$2)';
		const values = ['007539372', '18615945399'];

		client.query(text, values, (err) => {
			if (err) {
				console.log('err', err);
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.get((req, resp) => {
		const text = 'select * from bd.teacherAsignature';

		client.query(text, (err, res) => {
			if (err) {
				console.log('err', err.stack);
				return resp.status(500).json({ success: false, res: err });
			} 
			return resp.json({ success: true, res: res.rows });
		});
	})
	.patch((req, resp) => {
		const text = 'UPDATE bd.teacherAsignature SET code_asignature=($1) WHERE ci_teacher=($2) and code_asignature=($3)';
		const values = ['19913004499', '007539372', '18615945399'];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.delete((req, resp) => {
		
		const text = 'DELETE FROM bd.teacherAsignature WHERE ci_teacher=($1) and code_asignature=($2)';
		const values = ['007539372', '19913004499'];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	});
/* FIN CRUD TABLA Asignature*/

/* CRUD TABLA studentAsignature */
httpRequestHandling.route('/studentAsignature')
	.post((req, resp) => {
		

		const text = 'INSERT INTO bd.studentAsignature(ci_student, code_asignature) VALUES ($1,$2)';
		const values = ['20242434', '99583631599'];

		client.query(text, values, (err) => {
			if (err) {
				console.log('err', err);
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.get((req, resp) => {
		const text = 'select * from bd.studentAsignature';

		client.query(text, (err, res) => {
			if (err) {
				console.log('err', err.stack);
				return resp.status(500).json({ success: false, res: err });
			} 
			return resp.json({ success: true, res: res.rows });
		});
	})
	.patch((req, resp) => {
		

		const text = 'UPDATE bd.studentAsignature SET name=($1) WHERE ci=($2) and code_asignature=($3)';
		const values = ['20242434', '45357565099'];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.delete((req, resp) => {
		
		const text = 'DELETE FROM bd.studentAsignature WHERE ci_student=($1) and code_asignature=($2)';
		const values = ['20242434', '45357565099'];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	});
/* FIN CRUD TABLA Asignature*/

/*---------------------------------------------*/

/* CRUD TABLA Guide */
httpRequestHandling.route('/guide')
	.post((req, resp) => {
	
		/*const text = 'INSERT INTO bd.guide(type_name,exercise_number,path_guide,num_guide,code_asignature,num_section) VALUES ($1,$2,$3,$4,$5,$6)';
		const values = ['guia 1', 10, 'http://resource', 1, '18615945399', 10];

		
		client.query(text, values, (err) => {
			if (err) {
				console.log('err', err);
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});*/


		function insertResources(index, resources, codAsignature, numGuide) {
			if (index <= resources.length-1) {
				const text = 'INSERT INTO bd.resourceMarker(pattFileSrc, gltfFileSrc, code_asignature, num_guide, ci_teacher) values ($1,$2,$3,$4,$5)';
				const values = [];
				values.push(resources[index].pattFilePath);
				values.push(resources[index].gltfFilePath);
				values.push(codAsignature.rows[0].code_asignature);
				values.push(numGuide.rows[0].count);
				values.push(req.body.ci_teacher);
				client.query(text, values)
					.then(() => {
						index = index + 1;
						console.log('index', index);
						insertResources(Number(index), resources, codAsignature, numGuide);
					})
					.catch((e) => {
						console.log(e);
						return false;
					});
			} else {
				return true;
			}
		}

		(async () => {
			const resources = req.body.resources;

			let text = 'select code_asignature from bd.teacherAsignature where ci_teacher=($1)';
			let values = [];
			values.push(req.body.ci_teacher);
			const codAsignature = await client.query(text, values);
			
			text = 'select COUNT(*) from bd.guide where code_asignature=($1) and ci_teacher=($2)';
			values = [];
			values.push(codAsignature.rows[0].code_asignature);
			values.push(req.body.ci_teacher);

			const numGuide = await client.query(text, values);

			text = 'INSERT INTO bd.guide(type_name,num_guide,code_asignature,ci_teacher) values ($1,$2,$3,$4)';
			values = new Array();
			values.push('Guia #' + numGuide.rows[0].count);
			values.push(numGuide.rows[0].count);
			values.push(codAsignature.rows[0].code_asignature);
			values.push(req.body.ci_teacher);

			await client.query(text, values);

			let index = 0;

			band = await insertResources(Number(index), resources, codAsignature, numGuide);
			
			if (band) {
				return resp.status(200).json({ success: true });
			} else {
				return resp.status(500).json({ success: true });
			}

			/*resources.forEach((obj) => {
				text = 'INSERT INTO bd.resourceMarker(pattFileSrc, gltfFileSrc, code_asignature, num_guide, ci_teacher) values ($1,$2,$3,$4,$5)';
				values = [];
				values.push(obj.pattFilePath);
				values.push(obj.gltfFilePath);
				values.push(codAsignature.rows[0].code_asignature);
				values.push(numGuide.rows[0].count);
				values.push(req.body.ci_teacher);
				console.log('values', values);
				client.query(text, values);
			});*/
		})();

		resp.status(200).json({ success: true });
	})
	.get((req, resp) => {
		const text = 'select * from bd.guide';

		client.query(text, (err, res) => {
			if (err) {
				console.log('err', err.stack);
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true, res: res.rows });
		});
	})
	.patch((req, resp) => {
		
		const text = 'UPDATE bd.guide SET type_name=($1) WHERE code_asignature=($2) and num_section=($3) and num_guide=($4)';
		const values = ['hola MUNDo', '18615945399', 10, 1];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.delete((req, resp) => {
		
		const text = 'DELETE FROM bd.guide WHERE code_asignature=($1) and num_section=($2) and num_guide=($3)';
		const values = ['18615945399', 10, 1];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	});
/* FIN CRUD TABLA Guide */

/* CRUD TABLA ResourceMarker */
httpRequestHandling.route('/resourceMarker')
	.post((req, resp) => {

		const text = 'INSERT INTO bd.resourceMarker(id,name_src,num_guide,code_asignature,path_marker,path_resource,date_created) VALUES ($1,$2,$3,$4,$5,$6,$7)';
		const values = [7, 'marker xyz', 1, '78808471299', 'http://resource_marker', 'http://resource_resource', '2008/12/31 21:05:00.59'];

		client.query(text, values, (err) => {
			if (err) {
				console.log('err', err);
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.get((req, resp) => {
		const text = 'select * from bd.resourceMarker';
		client.query(text, (err, res) => {
			if (err) {
				console.log('err', err.stack);
				return resp.status(500).json({ success: false, res: err });
			} 
			return resp.json({ success: true, res: res.rows });
		});
	})
	.patch((req, resp) => {
		const text = 'UPDATE bd.resourceMarker SET name_src=($1) WHERE code_asignature=($2) and num_guide=($3) and id=($4)';
		const values = ['nombre X', '78808471299', 1, 7];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.delete((req, resp) => {
		const text = 'DELETE FROM bd.resourceMarker WHERE code_asignature=($1) and num_guide=($2) and id=($3)';
		const values = ['78808471299', 1, 7];

		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	});

httpRequestHandling.route('/resourceMarker/:id')
	.post((req, resp) => {
		(async () => {
			const id = req.body.id;
			const text = 'select pattFileSrc, gltfFileSrc from bd.resourceMarker where num_guide=($1)';
			const values = [];
			values.push(id);

			const result = await client.query(text, values);

			if (result.rows.length > 0) {
				return resp.status(200).json({ success: true, resources: result.rows });
			} else {
				return resp.status(500).json({ success: false, msj: 'error al obtener recursos' });
			}
		})();
	});
/* FIN CRUD TABLA ResourceMarker */

/* ENDPOINT LOGIN */
httpRequestHandling.route('/login')
	.post((req, resp) => {
		/*const text = 'select * from bd.users where email=($1) and password=($2)';
		const values = [];
		values.push(req.body.email);
		values.push(req.body.password);

		client.query(text, values, (err, data) => {
			if (err) {
				return resp
					.status(500)
					.send({ status:500, err: err.stack });
			}

			if (data.rows.length > 0) {
				return resp
					.status(200)
					.json({ status: 200, token: service.createToken(data.rows), rol: data.rows[0].rol });
			} else {
				return resp
					.status(500)
					.send({ status: 500, err: 'usuario no registrado' });
			}*/

			(async () => {
				var guides = new Array();
				var nameAsignatures = new Array();
				async function getGuide(index, asignatures) {
					if (index <= asignatures.length-1) {
						let data;
						const text = 'select type_name, num_guide from bd.guide where code_asignature=($1) and ci_teacher=($2)';
						const values = [];
						values.push(asignatures[index].code_asignature);
						values.push(asignatures[index].ci_teacher);
					
						try {
							data = await client.query(text, values);
						} catch (e) {
							console.log(e);

							return false;
						}

						guides.push(data.rows);
						index = index + 1;

						return getGuide(Number(index), asignatures, guides);
					} else {
						return true;
					}
				}

				async function getNameAsignature(index, asignatures) {
					if (index <= asignatures.length-1) {
						let data;
						const text = 'select name from bd.asignature where code_asignature=($1)';
						const values = [];
						values.push(asignatures[index].code_asignature);

						try {
							data = await client.query(text, values);
						} catch (e) {
							console.log(e);
							return false;
						}
						nameAsignatures.push(data.rows);
						index = index + 1;
						return getGuide(Number(index), asignatures, nameAsignatures);
					} else {
						return true;
					}
				}

				let pathModel = './public/assets/vectorial/models/';
				let pathImage = './public/assets/vectorial/imgFiles/';
				let pathPatt = './public/assets/vectorial/pattFiles/';
				let pathModelTmp = './public/assets/vectorial/models/';
				let pathImageTmp = './public/assets/vectorial/imgFiles/';
				let pathPattTmp = './public/assets/vectorial/pattFiles/';
				let text = 'select * from bd.users where email=($1) and password=($2)';
				let values = [];
				values.push(req.body.email);
				values.push(req.body.password);

				const userData = await client.query(text, values);

				if (userData.rows.length > 0) {

					const select = 'select name, last_name, ci from';
					const from = userData.rows[0].rol === 2 ? ' bd.student' : ' bd.teacher';
					const where = ' where email=($1)';

					text = select + from + where;
					values = [];
					values.push(req.body.email);

					const user = await client.query(text, values);

					if (user.rows.length > 0) {
						if (userData.rows[0].rol === 3) {
							const ci = user.rows[0].ci;
							pathModel = pathModel + ci;
							pathImage = pathImage + ci;
							pathPatt = pathPatt + ci;

							if (!fs.existsSync(pathModel)) fs.mkdirSync(pathModel);
							if (!fs.existsSync(pathImage)) fs.mkdirSync(pathImage);
							if (!fs.existsSync(pathPatt)) fs.mkdirSync(pathPatt);

							pathModelTmp = pathModelTmp + ci + '/tmp/';
							pathImageTmp = pathImageTmp + ci + '/tmp/';
							pathPattTmp = pathPattTmp + ci + '/tmp/';

							if (!fs.existsSync(pathModelTmp)) fs.mkdirSync(pathModelTmp);
							if (!fs.existsSync(pathImageTmp)) fs.mkdirSync(pathImageTmp);
							if (!fs.existsSync(pathPattTmp)) fs.mkdirSync(pathPattTmp);
						}

						if (userData.rows[0].rol === 3) {
								return resp
									.status(200)
									.json({
										status: 200,
										token: service.createToken(userData.rows[0]),
										rol: userData.rows[0].rol,
										name: user.rows[0].name,
										lastName: user.rows[0].last_name,
										ci: user.rows[0].ci,
										pathTeacher: {
											pathModel: pathModel,
											pathImage: pathImage,
											pathPatt: pathPatt,
										},
										pathTmp: {
											pathModelTmp: pathModelTmp,
											pathImageTmp: pathImageTmp,
											pathPattTmp: pathPattTmp,
										},
									});
							} else if (userData.rows[0].rol === 2) {
								const ci = user.rows[0].ci;
								let text = 'select ci_teacher, code_asignature from bd.studentAsignature where ci_student=($1)';
								let values = new Array();
								values.push(ci);

								let asignatures = await client.query(text, values);
								asignatures = asignatures.rows;

								const bandGuide = await getGuide(0, asignatures);
								const bandAsignature = await getNameAsignature(0, asignatures);
								
								if (bandGuide && bandAsignature) {
									return resp
										.status(200)
										.json({
											status: 200,
											token: service.createToken(userData.rows[0]),
											rol: userData.rows[0].rol,
											name: user.rows[0].name,
											lastName: user.rows[0].last_name,
											guidesNames: guides,
											asignatureName: nameAsignatures[0],										});
								} else {
									return resp.status(500).json({ status: 500, msj: 'error al obtener guides' });
								}
							}
					} else {
						return resp
							.status(500)
							.send({ status: 500, err: 'error no registrado en tabla teacher o student' });
					}
				}

				return resp
					.status(500)
					.send({ status: 500, err: 'usuario no registrado' });
			})();

		//});
	});
/* FIN ENDPOINT LOGIN */

/* ENDPOINT LOGOUT */
httpRequestHandling.route('/logout')
	.post((req, resp) => {
		if (!req.headers.authorization) return;

		return resp.status(200).json({ status: 200, token: '' });
	});

/* ENDPOINT LOGOUT */

/* ENDPOINT REGISTER */
httpRequestHandling.route('/register')
	.get((req, resp) => {
		(async () => {
			let text = 'select * from bd.career';
			let career = await client.query(text);

			if (career.rows.length === 0) {
				return resp.status(500).json({ success: false, res: 'no existen carreras' });
			}

			text = 'select * from bd.roles where not rol = 1';
			let roles = await client.query(text);

			if (roles.rows.length === 0) {
				return resp.status(500).json({ success: false, res: 'no existen roles' });
			}

			text = 'select * from bd.teacherasignature';
			let teachers = await client.query(text);
			return resp.status(200).json({ success: true, career: career.rows, rol: roles.rows, teachers: teachers.rows });
		})();
	});

httpRequestHandling.route('/register/:id')
	.post((req, resp) => {
		let text = 'select student.ci, teacher.ci from bd.student as student, bd.teacher as teacher where student.email=($1) or student.ci=($2) or teacher.email=($1) or teacher.ci=($2)';
		let values = [];
		values.push(req.body.email);
		values.push(req.body.ci);

		(async () => {
			const result = await client.query(text, values);

			if (result.rows.length > 0) {
				return resp.status(500).json({ success: false, msj: 'usuario registrado' });
			}

			const insert = 'INSERT INTO ';
			let table = req.params.id === ':2' ? 'bd.student(name,last_name,ci,email) ' : 'bd.teacher(name,last_name,ci,email) ';
			let introValues = req.params.id === ':2' ? 'values ($1,$2,$3,$4)' : 'values ($1,$2,$3,$4)';
			text = insert + table + introValues;

			values = new Array();
			values.push(req.body.name);
			values.push(req.body.lastName);
			values.push(req.body.ci);
			values.push(req.body.email);

			console.log('values', values);
			console.log('values', text);

			await client.query(text, values, (err) => {
				if (err) {
					resp.status(500).json({ success: false, msj: 'error al registrar usuario' });
				} else if (req.params.id === ':2') {

					console.log('req', req.body);
					values = new Array();
					values.push(req.body.ci);
					values.push(req.body.ci_teacher);
					values.push('cal3');

					table = 'INSERT INTO bd.studentasignature(ci_student,ci_teacher,code_asignature)';
					introValues = ' values ($1,$2,$3)';
					text =  table + introValues;

					client.query(text, values, (err) => {
						if (err) {
							console.log('err', err);
							return resp.status(500).json({ success: false, msj: 'error al registrar usuario en teacherasignature' });
						}
					});

				} else if (req.params.id === ':3') {
					const pathModel = './public/assets/vectorial/models/' + req.body.ci;
					const pathImage = './public/assets/vectorial/imgFiles/' + req.body.ci;
					const pathPatt = './public/assets/vectorial/pattFiles/' + req.body.ci;

					if (!fs.existsSync(pathModel)) fs.mkdirSync(pathModel);
					if (!fs.existsSync(pathImage)) fs.mkdirSync(pathImage);
					if (!fs.existsSync(pathPatt)) fs.mkdirSync(pathPatt);

					values = Array();
					values.push(req.body.name);
					values.push(req.body.lastName);
					values.push(req.body.ci);
					values.push('cal3');
					table = 'INSERT INTO bd.teacherasignature(name,last_name,ci_teacher,code_asignature)';
					introValues = ' values ($1,$2,$3,$4)';
					text =  table + introValues;

					client.query(text, values, (err) => {
						if (err) {
							console.log('err', err);
							return resp.status(500).json({ success: false, msj: 'error al registrar usuario en teacherasignature' });
						}
					});
				}
			});

			text = 'INSERT INTO bd.users(email,password,rol) VALUES ($1,$2,$3)';
			values = new Array();
			values.push(req.body.email);
			values.push(req.body.password1);
			values.push(req.body.rol);

			client.query(text, values, (err) => {
				if (err) {
					resp.status(500).json({ success: false, msj: 'error al insertar en tabla user', err: err.stack });
				}
				return resp.status(200).json({ status: 200 });
			});

		})();
	});

/*	.post((req, resp) => {
		let text = 'select * from bd.student where email=($1) or ci=($2)';
		let values = [];
		values.push(req.body.email);
		values.push(req.body.ci);
		values.push(req.body.ci);
		values.push(req.body.ci);
		values.push(req.body.ci);

		(async () => {
			
			const result = await client.query(text, values);

			if (typeof result.rows[0] === 'object') {
				return resp.status(500).json({ success: false, msj: 'usuario registrado' });
			}

			text = 'INSERT INTO bd.student(name,last_name,ci,semester,email,phone) VALUES ($1,$2,$3,$4,$5,$6)';
			values = Object.keys(req.body).map(key => req.body[key]);
			values.pop();
			values.pop();
			await client.query(text, values, (err) => {
				if (err) resp.status(500).json({ success: false, msj: 'error al registrar usuario' });
			});

			text = 'INSERT INTO bd.users(email,password,rol) VALUES ($1,$2,$3)';
			values = [];
			values.push(req.body.email);
			values.push(req.body.password1);
			values.push('student');
			console.log('values', values);

			client.query(text, values, (err) => {
				if (err) resp.status(500).json({ success: false, msj: 'error al insertar en tabla user', err: err.stack });
			
				return resp.status(200).json({ status: 200 });
			});
		})();
		
	})*/

httpRequestHandling.route('/createMarker')
	.get((req, resp) => {
		client.query('SELECT NOW() as now', (err, data) => {
			if (err) {
				return resp.status(500);
			}
			return resp.status(200).json({ status: 200, time: data.rows[0] });
		});
	});

module.exports = httpRequestHandling;
