const mongoose = require('mongoose');
const schema = mongoose.Schema;

const autorSchema = new mongoose.Schema({ // document embedded
    nombre: {
        type: String
    },
    email: {
        type: String
    }
})
const cursoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    autor : autorSchema,
    /*autor: { // document reference
        type: schema.Types.ObjectId, ref : 'usuario',
    },*/
    descripcion:{
        type: String,
        required: true,
    
    },
    estado: {
        type: Boolean,
        default: true,
    },
    image: {   
        type: String,
        required: false,
    },
    alumnos: {
        type: Number,
        default: 0,
    },
    califica: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Curso', cursoSchema);