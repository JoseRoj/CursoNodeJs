//import { usuario_model} from "../models"}
const usuario_model = require('../models/usuario_model');
const bcrypt = require('bcrypt');


module.exports = {
    async createUsers(body){
        //let newUser = await user.create(body);
        try{
            //let newUser = await usuario_model.create(body);
            let newUser = new usuario_model({
                email: body.email,
                nombre: body.nombre,
                password: bcrypt.hashSync(body.password,10),
            });     
            const result = await newUser.save();
            return !newUser ? {statusCode: 400, error: "No se pudo crear el usuario"} : {statusCode: 200, data: {nombre : newUser.nombre, email: newUser.email}};
        }catch(error){
            return {statusCode: 500, error: error}
        }
    },
    async updateUser(email, body){
        try{
            let user = await usuario_model.findOneAndUpdate({email},{
                $set: {
                    nombre: body.nombre,
                    password: bcrypt.hashSync(body.password,10)
                }
            }, {new: true});
            return !user ? {statusCode: 400, error: "No se pudo actualizar el usuario"} : {statusCode: 200, data: user};
        }catch(error){
            return{ statusCode: 500, error: error }   
        }
    },
    async desactiveUser(email){
        try{
            let user = await usuario_model.findOneAndUpdate({email},{
                $set: {
                    estado: false
                },
            },{new: true}).select({nombre: 1, email: 1});
            return !user? {statusCode: 400, error: "No se pudo desactivar el usuario"} : {statusCode: 200, data: user};
        }catch(error){
            return { statusCode: 500, error: error}
        }
    },

    async getUsers(){
        try{
            let users = await usuario_model.find({"estado": true}).select({nombre: 1, email: 1});
            return !users ? {statusCode: 400, error: "No se pudo listar los usuarios"} : {statusCode: 200, data: users};
        }catch(error){
            return { statusCode: 500, error: error}
        }
    }
}