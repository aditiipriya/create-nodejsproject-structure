"use strict";
const auth = require('basic-auth');
let config = require('../../../config');

let basicAuthentication = function (request, response, next) {
    console.log('basicAuthentication');
    if (request.method == 'OPTIONS') {
        response.sendStatus(200);
    } else{
        const credentials = auth(request);
        if (!credentials || credentials.name !== config.cfg.basicAuth.name || credentials.pass !== config.cfg.basicAuth.pass) {
          response.statusCode = 401
          //response.setHeader('WWW-Authenticate', 'Basic realm="example"')
          response.send({message:'Access denied'})
        } else {
            next();
        }
    }
}

module.exports = {
    basicAuthentication
}

