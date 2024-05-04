// middlewareValidation.js 
// MIDDLEWARE-------------------------------------------------------------------------------
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'eriyfbercbieobu3hrurebuberHBububUOBUOUBuo3728u'


const middlewareValidation = (req,res,next) =>{
    // get token from header
        const token = JSON.parse(req.headers['x-access-token']);
        // console.log(token.token)
    
        // verify token
        jwt.verify(token.token, JWT_SECRET, (error) => {
            if (error) {
                return res.status(401).json({ status: 'error', message: 'Token tidak valid' });
            } else {
                next();
            }
        });
    }
    

module.exports = middlewareValidation;