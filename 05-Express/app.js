const debug = require('debug')('app:inicio','app:db');

//const dbDebug = require('debug')('app:db');
const express = require('express')
const config = require('config')
const app = express()
const logger = require('./logger')
const Joi = require('@hapi/joi')
const morgan = require('morgan')
app.use(express.json());
app.use(express.urlencoded()); // Otro foramto de entrada o salida de texto
app.use(express.static('public'))


// Configuracion de entornos
console.log('Aplicacion: ' + config.get('nombre'));
console.log('Aplicacion: ' + config.get('configDB.host'));
//app.use(logger);
if(app.get('env') === 'development'){
    app.use(morgan('tiny')); 
    debug('Morgan esta Habilitado')
    //console.log("Morgan habilitado")
}
debug('Conectando con la base de datos')
app.use(function(req, res, next){
    console.log('Autenticando ...')
    next();
});

const usuarios = [
    {id:1 , nombre : "Jose"},
    {id:2 , nombre : "Jua"},
    {id:3 , nombre : "Joe"}
]

app.get('/',(req,res) => {
    res.send("Hooa desde Express")
});

app.get('/api/usuarios', (req,res) => {
    res.send(usuarios)
})
app.get('/api/usuarios/:id', (req,res) => {
    let usuario = existeUsuario(req.params.id)
    if(!usuario){
        res.status(404).send('El usauraio no fue encontrado');
        return;
    }else{res.send(usuario)};
})
app.post('/api/usuarios', (req,res) => {
    const schema = Joi.object({
        nombre : Joi.string().min(3).required()
    });
    const {error,value} = validarUsuario(req.body.nombre)
    if(!error){
        const usuario = {
            id: usuarios.length + 1,
            nombre: value.nombre
        }
        usuarios.push(usuario)   
        res.send(usuario)
    }else{
        res.status(400).send(error.details[0].message)
    }
})

app.put('/api/usuarios/:id', (req,res) => {
    // encontrar si existe
    let usuario = existeUsuario(req.params.id)
    if(!usuario) {
        res.status(404).send('El usauraio no fue encontrado');
        return
    }
    const {error,value} = validarUsuario(req.body.nombre)
    if(error){
        res.status(400).send(error.details[0].message)
        return
    }
    usuario.nombre = value.nombre;
    res.send(usuario);
})

app.delete('/api/usuarios/:id',(req,res) => {
    let usuario = existeUsuario(req.params.id)
    if(!usuario) {
        res.status(404).send('El usauraio no fue encontrado');
        return
    }
    const index = usuarios.indexOf(usuario)
    usuarios.splice(index,1)
    res.send(usuarios)

})
app.listen(3000,() =>{
    console.log("Escuchando en el puerto 3000")
})

function existeUsuario(id){
    return usuarios.find(u => u.id === parseInt(id));
}
function validarUsuario(nombre){
    const schema = Joi.object({
        nombre : Joi.string().min(3).required()
    });
    return  schema.validate({nombre : nombre});
}

