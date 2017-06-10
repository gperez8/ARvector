const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const engine = require('ejs-locals');
const path = require('path');
const mongoose = require('mongoose');

//	Se inicializan Variables
const app = express();
const directoryToServe = path.join(__dirname, '/public/assets');
const httpPort = 3000;
const httpsPort = 3001;

//	Se establece directorio estatico
app.use('/src', express.static(directoryToServe));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));
app.use('/dist', express.static(path.join(__dirname,'/dist')))

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


//	Configuracion del Motor de vistas
app.engine('html', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//	aterrizaje por default
app.get('/', (req, res) => {
	res.render('index', { data: { name: 'Gregory' } });
});

//	Certificado SSL
const httpsOptions = {
	cert: fs.readFileSync(path.join(__dirname, '/app/certificate_SSL', 'cert.pem'), 'utf8'),
	key: fs.readFileSync(path.join(__dirname, '/app/certificate_SSL', 'key.pem'), 'utf8'),
};

//	Se crean los servidores HTTP y HTTPS
const httpServer = http.createServer(app);
const httpsServer = https.createServer(httpsOptions, app);

//	Se ponen a escuchar a los servidores por los
//	puertos 3000 y 3001
httpServer.listen(httpPort);
httpsServer.listen(httpsPort);

// URL desconocidas 404
app.use((req, res) => {
	const err = new Error('Not Found');
	err.status = 404;
	res.send('NOT FOUND');
});


/* Conexion a la dase de datos */
mongoose.connect('mongodb://localhost:27017/arvector', (err) => {
	if (err) {
		return console.log(`Error al conectar con la DB: ${err}`);
	}
	console.log('conectado a la db');
});

module.exports = app;
module.exports = mongoose;
