const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const engine = require('ejs-locals');
const path = require('path');

//	Se inicializan Variables
const app = express();
const directoryToServe = path.join(__dirname, '/public/assets');
const httpPort = 3000;
const httpsPort = 3001;

//	Se establece directorio estatico
app.use('/', express.static(directoryToServe));

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

module.exports = app;
