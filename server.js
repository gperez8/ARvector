const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const engine = require('ejs-locals');
const path = require('path');

const app = express();
const directoryToServe = path.join(__dirname, '/public/assets');
const httpPort = 3000;
const httpsPort = 3001;

app.use('/', express.static(directoryToServe));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


// view engine setup
app.engine('html', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.get('/', (req, res) => {
	res.render('index', {data: { name: 'Gregory'}});
});

const httpsOptions = {
	cert: fs.readFileSync(path.join(__dirname, '/app/certificate_SSL', 'cert.pem'), 'utf8'),
	key: fs.readFileSync(path.join(__dirname, '/app/certificate_SSL', 'key.pem'), 'utf8'),
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(httpsOptions, app);

httpServer.listen(httpPort);
httpsServer.listen(httpsPort);


