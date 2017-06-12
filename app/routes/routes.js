const express = require('express');
/*const app = require('./server');
const mongoose = require('./server');

console.log('app ->', app);
console.log('mongoose ->', mongoose);*/

const router = express.Router();

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/about', (req, res) => {
	res.render('about');
});

module.exports = router;
