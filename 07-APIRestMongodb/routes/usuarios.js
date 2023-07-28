const express = require('express');
const userController = require('../controllers/usuario');
const { stat } = require('fs');
const Joi = require('@hapi/joi');
const usuario_model = require('../models/usuario_model');
const config = require('config');
const jwt = require('jsonwebtoken');
const verifyToken  = require('../middlewares/auth');

const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
});


module.exports = (app) => {


    app.get('/api/usuarios', verifyToken ,async (req, res) => {
        let result
        try{
             result = await userController.getUsers();
        }catch(error){
            result = {statusCode: 400, error: error}
        }
        return !result ? res.status(500).send({ error: "Error interno del servidor" })
            : result.statusCode !== 200
            ? res.status(result.statusCode).send(result.error)
            : res.status(200).send(result.data);
    });

    app.post('/api/usuarios', async (req, res) => {
        
        let result;
        let body = req.body;

        // Comprobe if the user already exists
        try{
            let user = await usuario_model.findOne({email: body.email})
            if(user){
                return res.status(400).send({error: "El usuario ya existe"})
            }
        }catch(error){
            return res.status(500).send({error : "Error interno del servidor"})
        }
        // Validate the data
        const {error,value} = schema.validate({nombre: body.nombre, email: body.email, password: body.password});
        if(!error){ 
            try{
                result = await userController.createUsers(body);
            }
            catch(error){
                result = {statusCode: 400, error: error}
            }
        }else{
            result = {statusCode: 400, error: error}
        }
        /*let result = userController.createUsers(body);
        result.then(result => {
            res.json({
                valor : result
            });
        })
        .catch(error => {
            res.status(400).json({
                ok: false,
                content: error,
            });
        });*/
        
        return !result ? res.status(500).send({ error: "Error interno del servidor" })
            : result.statusCode !== 200
            ? res.status(result.statusCode).send(result.error)
            : res.status(200).send(result.data);
    });
    app.put('/api/usuarios/:email', verifyToken ,async (req, res) => {
        let result;
        const {error,value} = schema.validate({nombre: req.body.nombre, password: req.body.password});
        if(!error){
            try{
                result = await userController.updateUser(req.params.email, req.body);
            }catch(err){
                result = {statusCode: 400, error: err}
            }
        }else{
            result = {statusCode: 400, error: error}
        }
        return !result ? res.status(500).send({ error: "Error interno del servidor" })
            : result.statusCode !== 200
            ? res.status(result.statusCode).send(result.error)
            : res.status(200).send(result.data);
    });
    app.delete('/api/usuarios/:email', verifyToken ,async (req, res) => {
        let result;
        try{
            result = await userController.desactiveUser(req.params.email);
        }catch(error){
            result = {statusCode: 400, error: error}
        }
        return !result ? res.status(500).send({ error: "Error interno del servidor" })
            : result.statusCode !== 200
            ? res.status(result.statusCode).send(result.error)
            : res.status(200).send(result.data);
    });
};

