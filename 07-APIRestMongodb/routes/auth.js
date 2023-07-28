const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const usuario_model = require('../models/usuario_model');
const auth = require('../controllers/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = (app) => {

    app.post('/api/login', (req, res) => {
        usuario_model.findOne({email: req.body.email})
            .then( datos => {
                if(datos && bcrypt.compareSync(req.body.password, datos.password) == true){ // Verify email and password
                    const jwtoken = jwt.sign({  // token with data
                        usuario: { _id: datos._id, nombre: datos.nombre , email: datos.email} 
                    }, config.get('configToken.SEED'), { expiresIn: config.get('configToken.expiration')});
                    //jwt.sign({ _id: datos._id, nombre: datos.nombre , email: datos.email}, 'password');
                    return res.status(200).send(
                        {
                            user : {
                                id :        datos._id, 
                                nombre :    datos.nombre,
                                email :     datos.email
                            },
                            token: jwtoken
                        })
                }else{
                    return res.status(400).send( {error: "El usuario o constraseña incorrecta"});
                }
            })
            .catch( error => {
                return res.status(500).send( {error: "El usuario o constraseña incorrecta" + error });
                //return { statusCode: 500, error: "Error interno del servidor " + error }
            })
        });
}  