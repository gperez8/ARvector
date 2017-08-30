const service = require('./service');
const { Pool, Client } = require('pg');
const express = require('express');
const app = express();


const client = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'arvector',
	password: 'C375035E',
	port: 5432,
});

exports.emailSignup = function (req, res) {
	// REGISTRAR
	let text = 'select * from bd.student where ci=($1)';
	let values = [];
	values.push(req.body.ci);
	client.connect();
	client.query(text, values, (err, data) => {
		if (err) return err.stack;

		if (data.rows.length === 0) {
			//return console.log('no registrado');
			let text = 'insert into(name,last_name,ci,semester,email,phone) values ($1,$2,$3,$4,$5,$6)';
			values = Object.keys(req.body).map(key => req.body[key]);
			console.log('value', values);
		}

		return console.log('registrado');
	});

};

exports.emailLogin = function (req, res) {
    // LOGIN
	
};
