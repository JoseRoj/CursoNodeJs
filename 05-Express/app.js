const debug = require('debug')('app:inicio','app:db');
//const dbDebug = require('debug')('app:db');
const express = require('express')
const config = require('config')
const app = express()
const logger = require('./logger')

const morgan = require('morgan')
const usuarios = require('./routes/usuarios')
app.use(express.json());
app.use(express.urlencoded()); // Otro foramto de entrada o salida de texto
app.use(express.static('public')) // publish imagen or other thing
app.use('/api/usuarios',usuarios)


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


app.listen(3000,() =>{
    console.log("Escuchando en el puerto 3000")
})
