const express = require('express');
const Curso = require('../models/curso_model');
const cursoController = require('../controllers/curso');
const verifyToken = require('../middlewares/auth');

module.exports = (app) => {

    app.get('/api/cursos', verifyToken ,async (req, res) => {
        /*console.log("fsdfds");
        return res.json({
            usuario : req.user})*/
        let result;
        try{
            result = await cursoController.getCursos();
        }catch(error){
            result = { statusCode: 500, error: error}
        }
        return !result ? res.status(500).send({ error: "Error interno del servidor" })
            : result.statusCode !== 200
            ? res.status(result.statusCode).send(result.error)
            : res.status(200).send(result.data);
    });

    app.post('/api/cursos', verifyToken ,async (req, res) => {
        let result;
        try{
            result = await cursoController.createCurso(req);
        }catch(error){
            result = { statusCode: 500, error: error}
        }
        return !result ? res.status(500).send({ error: "Error interno del servidor" })
            : result.statusCode !== 200
            ? res.status(result.statusCode).send(result.error)
            : res.status(200).send(result.data);
    });

    app.put('/api/cursos/:id', verifyToken ,async (req, res) => {
        let result;
        try{
            result = await cursoController.updateCurso(req.params.id, req.body);
        }catch(error){
            result = { statusCode: 500, error: error}
        }
        return !result ? res.status(500).send({ error: "Error interno del servidor" })
            : result.statusCode !== 200
            ? res.status(result.statusCode).send(result.error)
            : res.status(200).send(result.data);
    });

    app.delete('/api/cursos/:id', verifyToken ,async (req, res) => {
        let result;
        try{
            result = await cursoController.desactiveCurso(req.params.id);
        }catch(error){
            result = { statusCode: 500, error: error}
        }
        return !result ? res.status(500).send({ error: "Error interno del servidor" })
            : result.statusCode !== 200
            ? res.status(result.statusCode).send(result.error)
            : res.status(200).send(result.data);
    });
}