const express = require('express')
const route = express.Router();
const Joi = require('@hapi/joi') // Verify data

const usuarios = [
    {id:1 , nombre : "Jose"},
    {id:2 , nombre : "Jua"},
    {id:3 , nombre : "Joe"}
]

/*route.get('/',(req,res) => {
    res.send("Hooa desde Express")
});*/

route.get('/', (req,res) => {
    res.send(usuarios)
})
route.get('/:id', (req,res) => {
    let usuario = existeUsuario(req.params.id)
    if(!usuario){
        res.status(404).send('El usuaraio no fue encontrado');
        return;
    }else{res.send(usuario)};
})
route.post('/', (req,res) => {
    const schema = Joi.object({
        nombre : Joi.string().min(3).required() // Verify min of 3 characters
    });
    const {error,value} = schema.validate({nombre: req.body.nombre}) //)validarUsuario(req.body.nombre)
    if(!error){
        const usuario = {
            id: usuarios.length + 1,
            nombre: value.nombre
        }
        usuarios.push(usuario)   
        res.send(usuario)
    }else{
        // 400 Bad Request
        res.status(400).send(error.details[0].message)
    }
})

route.put('/:id', (req,res) => {
    // encontrar si existe
    let usuario = existeUsuario(req.params.id)
    if(!usuario) {
        res.status(404).send('El usuario no fue encontrado');
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

route.delete('/:id',(req,res) => {
    let usuario = existeUsuario(req.params.id)
    if(!usuario) {
        res.status(404).send('El usuario no fue encontrado');
        return
    }
    const index = usuarios.indexOf(usuario)
    usuarios.splice(index,1) // Delete 1 element from index
    res.send(usuarios)

})

function existeUsuario(id){
    return usuarios.find(u => u.id === parseInt(id));
}
function validarUsuario(nom){
    const schema = Joi.object({
        nombre : Joi.string().min(3).required()
    });
    return  schema.validate({nombre :  nom});
}

module.exports = route;