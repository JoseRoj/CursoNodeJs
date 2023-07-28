const jwt = require('jsonwebtoken');
const config = require('config');

let verifyToken = (req, res, next) => {
    let token = req.get('Authorization');
    jwt.verify(token, config.get('configToken.SEED'), (err, decoded) => {
        if(err){
            return res.status(401).send({error : err});
        }
        req.user = decoded.usuario;
        next();
    });
}

module.exports = verifyToken;


