const curso_model = require('../models/curso_model');

module.exports = {
    async createCurso(req){
        try{
            let newCurso = new curso_model({
                titulo:         req.body.titulo,
                descripcion:    req.body.descripcion,
                autor:          req.user._id,
                //autor:          req.user,
            });
            const result = await newCurso.save();
            return !newCurso ? {statusCode: 400, error: "No se pudo crear el curso"} : {statusCode: 200, data: newCurso};
        }catch(error){
            return{
                statusCode: 500,
                error: error,
            }
        }
    },
    async updateCurso(id, body){
        try{
            let curso = await curso_model.findByIdAndUpdate(id,{
                $set: {
                    titulo:         body.titulo,
                    descripcion:    body.descripcion, 
                }
            },{new: true});
            return !curso ? {statusCode: 400, error: "No se pudo actualizar el curso"} : {statusCode: 200, data: curso};
        }catch(error){
            return{
                statusCode: 500,
                error: error,
            }
        }
    },
    async desactiveCurso(id){
        try{
            let curso = await curso_model.findByIdAndUpdate(id,{
                $set: {
                    estado: false
                }
            },{new: true});
            return !curso? {statusCode: 400, error: "No se pudo desactivar el usuario"} : {statusCode: 200, data: curso};
        }catch(error){
            return { statusCode: 500, error: error}
        }
    },
    async getCursos(){
        try{
            let cursos = await curso_model.find({estado : {$in :[ true, false]}}).populate('autor','nombre email');
            //.populate('autor')//{path: 'autor', select: {nombre: 1, email: 1, _id: 0}});
            return !cursos ? {statusCode: 400, error: "No se pudo listar los cursos"} : {statusCode: 200, data: cursos};
        }catch(error){
            return { statusCode: 500, error: error}
        }
    }


}


