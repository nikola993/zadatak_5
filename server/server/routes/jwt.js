const expressJwt = require('express-jwt');
const config = require('../config/jwtConfig');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/api/user/registration',
            '/api/user/login',
        ],
    });
}
