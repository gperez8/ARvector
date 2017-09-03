const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('./config');

exports.ensureAuthenticated = function (req, res, next) {
    
    /*console.log('res', res.method);

    if (!req.headers.authorization) {
        return res.redirect('/');
            //.status(403).end();
            //.send({ message: 'Tu petición no tiene cabecera de autorización' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token, config.TOKEN_SECRET);

    if (payload.exp <= moment().unix()) {
        return res
            .status(401)
            .send({ message: 'El token ha expirado' });
    }

    console.log('sub', payload.sub);
    req.user = payload.sub;
    next();*/
}