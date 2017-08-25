const { Pool, Client } = require('pg');
const httpRequestHandling = require('../routes/routes');

const client = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'arvector',
	password: 'C375035E',
	port: 5432,
});

/* CRUD TABLA career*/
httpRequestHandling.route('/career')
	.post((req, resp) => {
		console.log('hola POST');

		const text = 'INSERT INTO bd.career(code_career,school) VALUES ($1,$2)';
		const values = ['0006', 'X'];

		client.connect();
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

		client.connect();
		client.query(text, (err, res) => {
			if (err) {
				console.log('sdfsd', err.stack);
				return resp.status(500).json({ success: false, res: err });
			} 
			return resp.json({ success: true, res: res.rows });
		});
	})
	.patch((req, resp) => {
		console.log('hola UPDATE');
		const text = 'UPDATE bd.career SET school=($1) WHERE code_career=($2)';
		const values = ['Y', '0006'];

		client.connect();
		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.delete((req, resp) => {
		console.log('hola DELETE');
		const text = 'DELETE FROM bd.career WHERE code_career=($1)';
		const values = ['0006'];

		client.connect();
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
		console.log('hola POST');

		const text = 'INSERT INTO bd.careerStudent(code_career,ci_student) VALUES ($1,$2)';
		const values = ['0006', 'X'];

		client.connect();
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

		client.connect();
		client.query(text, (err, res) => {
			if (err) {
				console.log('sdfsd', err.stack);
				return resp.status(500).json({ success: false, res: err });
			} 
			return resp.json({ success: true, res: res.rows });
		});
	})
	.patch((req, resp) => {
		console.log('hola UPDATE');
		const text = 'UPDATE bd.careerStudent SET school=($1) WHERE code_career=($2)';
		const values = ['Y', '0006'];

		client.connect();
		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.delete((req, resp) => {
		console.log('hola DELETE');
		const text = 'DELETE FROM bd.careerStudent WHERE code_career=($1) and ci_student =($2)';
		const values = ['0006'];

		client.connect();
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
		console.log('hola POST');

		const text = 'INSERT INTO bd.careerAsignature(code_career,code_asignature) VALUES ($1,$2)';
		const values = ['0006', 'X'];

		client.connect();
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

		client.connect();
		client.query(text, (err, res) => {
			if (err) {
				console.log('sdfsd', err.stack);
				return resp.status(500).json({ success: false, res: err });
			} 
			return resp.json({ success: true, res: res.rows });
		});
	})
	.patch((req, resp) => {
		console.log('hola UPDATE');
		const text = 'UPDATE bd.careerAsignature SET school=($1) WHERE code_career=($2)';
		const values = ['Y', '0006'];

		client.connect();
		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	})
	.delete((req, resp) => {
		console.log('hola DELETE');
		const text = 'DELETE FROM bd.careerAsignature WHERE code_career=($1) and code_asignature=($2)';
		const values = ['0006'];

		client.connect();
		client.query(text, values, (err) => {
			if (err) {
				return resp.status(500).json({ success: false, res: err });
			}
			return resp.json({ success: true });
		});
	});
/* FIN CRUD TABLA careerAsignature*/

module.exports = client;

