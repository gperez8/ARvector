const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const engine = require('ejs-locals');
const path = require('path');
const compression = require('compression');
const httpRequestHandling = require('./app/routes/routes');
const client = require('./app/bd/bd');

//	Se inicializan Variables
const app = express();
const directoryToServe = path.join(__dirname, '/public/assets');
const httpPort = 3000;
const httpsPort = 3001;

// comprimir todas las respuestas
app.use(compression());

//	Se establece directorio estatico
app.use('/views', express.static(path.join(__dirname, '/public/views')));
app.use('/src', express.static(directoryToServe));
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));
app.use('/dist', express.static(path.join(__dirname, '/dist')));
app.use('/lib', express.static(path.join(__dirname, '/lib')));

app.set('port', (process.env.PORT || 3000));

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded());

//	Configuracion del Motor de vistas
app.engine('html', engine);
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'html');

//	Certificado SSL
const httpsOptions = {
	cert: fs.readFileSync(path.join(__dirname, '/app/certificate_SSL', 'cert.pem'), 'utf8'),
	key: fs.readFileSync(path.join(__dirname, '/app/certificate_SSL', 'key.pem'), 'utf8'),
};

//	Se crean los servidores HTTP y HTTPS
const httpServer = http.createServer(app);
// const httpsServer = https.createServer(httpsOptions, app);

//	Se ponen a escuchar a los servidores por los
//	puertos 3000 y 3001
httpServer.listen(app.get('port'));
//httpsServer.listen(httpsPort);

// manejador de peticiones de las rutas
app.use('/', httpRequestHandling);

// URL desconocidas 404
app.use((req, res) => {
	res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

module.exports = app;
