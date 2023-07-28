const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/demo')
    .then(() => console.log('Conectado a MongoDB'))
    .catch( err => console.log('Error al conectarse'))

const cursoSchema = new mongoose.Schema({       // Definition of schema (structure of document)
    nombre      : String,
    autor       : String,
    etiquetas   : [String],
    fecha       : {type: Date, default: Date.now},
    publicado   : Boolean
});

const Curso = mongoose.model('Curso', cursoSchema);

async function crearCurso(){
    const curso = new Curso({
        nombre: 'JS',
        autor: 'Juan Rojas',
        etiquetas: ['Desarrollo web', 'Backend'],
        publicado: true
    });
    const resultado = await curso.save()       
    console.log(resultado)
}
//crearCurso();

async function listarCursos(){
    // eq ( equal)
    //ne (not equal)
    // gt ( greater tahn)
    // gte ( greater equal than) 
    // lt less than
    // lte less equal than
    // in 
    // nin ( not in)
    // or
    // and
    const numeroPage = 2
    const sizePage = 1
    //api/cursos?numeroPage=2&sizePage=10
    const cursos = await Curso
        //.find({publicado: true})
        //.find({precio: { $gte:10, $lte:30}} )
        //.find(precio: {$in: [10, 15,25]}})
        // empieze con
        //.find({autor: /^Ro/})
        // termine
        //.find({autor: /ver$/})
        // tenga 
        .find({autor: /.*ro.*/})
        //.or([{autor : 'Rojas'} ])
        //.skip((numeroPage - 1) * sizePage)    // pagination 
        //.limit(sizePage)
        .sort({autor: -1}) // -1 Descending 1 Ascending
        .select({nombre: 1, etiquetas:1}) // specific fields
    console.log(cursos);
}
//listarCursos();

async function actualizarCurso(id){
    /*const curso = await Curso.findById(id);
    
    // Firt way
    if(!curso){
        console.log("El curso no existe")
        return;
    }
    curso.publicado = false;
    curso.autor = 'Kike'
    const resultado = await curso.save()
    console.log(resultado)

    // Second way

    /*curso.set({
        publicado: false,
        autor: 'Grove'
    })*/
    /*const resultado = await Curso.update({_id : id}, {
        $set: {
            autor: 'Jara',
            publicado : false,
        }
    })*/

    // Third way
    const resultado = await Curso.findByIdAndUpdate(id,{
        $set: {
            autor: 'Jara',
            publicado : true,
        }
    },{ new: true}); // para traer valor actualizado
    console.log(resultado);
}
//actualizarCurso('64b9d900b7dea824cac07141')
async function eliminarDocumento(id){
    const result = await Curso.deleteOne({_id: id})
   //const result = await Curso.findByIdAndDelete(id);
    console.log(result)
}
eliminarDocumento('644465825c39528982bf2cfc');