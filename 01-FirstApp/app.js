// ES5 - VARIABES/
/*var nombre = "Jose"
console.log(nombre);
nombre = "Juan"
console.log(nombre);

// ES6+ - Variables
const nombre6 = "Luis"; 
let edad = 55;
console.log(nombre);
console.log(edad);
edad = 40;
console.log(edad)

// Funciones en ES5 de tipo flechas
const years = [2000, 2005, 2008, 2012]

var edad5 = years.map(function(el){
    return 2019 - el
})
console.log(edad5)

// Funciones en ES6 de tipo flechas
var edad6 = years.map(el =>  2019 - el )
console.log(edad6)*/

// FUNCIONES CALLBACK
/*function sumar(num1, num2, callback){
    let result = num1 + num2
    //console.log("Mensaje antes de la llamada callback")
    callback(result);
}
function saludo(res){
    //console.log('Saludo despuesß de la llamada callback')
    console.log(res)
}
sumar(5,8, saludo)

setTimeout(() => console.log("Se ejecuta dsp de 30 seg") ,3000)*/

/*const mensaje = new Promise((resolve,reject) => {
    setTimeout(() => {
        if (false)
            resolve("Se ejecuta dsp de 3 seg") 
        else 
            reject('Hubo un error.');
    },3000)
});
mensaje
    .then(msj => {
        console.log(msj)
    })
    .catch( error => {
        console.log(error);
    })
*/
//  Asinc / Await
function mensaje(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(true)
                resolve("Se ejecuta dsp de 3 seg") 
            else 
                reject('Hubo un error.');
        },3000);
    });
}
async function llamadaAsync(){ // devuellve una promosa, si es eeror hay que manejarlo
    console.log('Llamando ... ')
    const resultado = await mensaje();
    return resultado
}
llamadaAsync()
    .then(x => console.log(x))
    .catch(error => console.log(error))