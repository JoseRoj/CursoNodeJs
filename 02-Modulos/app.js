    /*var datos = require('./datos')
datos.log("Hola Mundo");*/

/*      Module path     */
const path = require('path');
const objPath = path.parse(__filename);
console.log(objPath);

/*      Module OS (System)    */ 
const OS = require('os');
var freememory = OS.freemem();
var totalmemory = OS.totalmem();
console.log(`Memoria Libre: ${freememory}`);
console.log(`Memoria Total: ${totalmemory}`); 


/*      Module OS (System)    */ 
const fs = require('fs');
const archivos = fs.readdirSync('./');
console.log(archivos) 

fs.readdir('./..', function(err,files){
    if(err) console.log('Error', err);
    else console.log("Resultado", files);
});

/*   Modulo Event  */
const EvenEmitter = require('events');
const emitter = new EvenEmitter();

// Registrar el listener
emitter.on('mensajeLoger',(arg) => {
    console.log("Listener llamado",arg)
})

//Registrar el evento
emitter.emit('mensajeLoger',{id: 1, url:'https'});


/*   Modulo HTTP  para crear  WEB Y APPIÍ*/

const http = require('http');
const server = http.createServer((req,res) => {
    if(req.url == '/'){
        res.write('Holaaaaa');
        res.end()
    }
    if(req.url == '/api/productos'){
        res.write(JSON.stringify(['Mouse', 'Teclado', 'Parlante' ]))
        res.end()
    }
})

server.on('connection', puerto =>{
    console.log("Nueva Coneccion")
});
server.listen(3000)
console.log('Server escuchando en el puerto 3000')
