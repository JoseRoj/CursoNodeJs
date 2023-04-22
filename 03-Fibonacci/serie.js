// Serie fibonacci
const { rejects } = require('assert');
const { promises } = require('dns');
const fs = require('fs');

let createSerie = (cantidad) => {
    return new Promise((resolve,reject) => {
        let fibo1 = 1;
        let fibo2 = 1;
        let serie = ''
        serie += `${fibo1}\t`;
        //console.log(`${fibo1}`)
        for (let i = 2; i < cantidad ; i++){
            serie += `${fibo2}\t`;
            //console.log(`${fibo2}\n`)
            fibo2 = fibo1 + fibo2;
            fibo1 = fibo2 - fibo1;
        }
        /* Guardando la serie en un archivo */
        const fs = require('fs');

        fs.writeFile('fibonacci.txt', serie ,(err) => {
            if(err) 
                reject("Error al crear el archivo");
            else 
                resolve("El archivo fue creado con exito") 
        });
    })
}
/*
function createSerie(cantidad){
        let fibo1 = 1;
        let fibo2 = 1;
        let serie = ''
        serie += `${fibo1}\t`;
        //console.log(`${fibo1}`)
        for (let i = 2; i < cantidad ; i++){
            serie += `${fibo2}\t`;
            //console.log(`${fibo2}\n`)
            fibo2 = fibo1 + fibo2;
            fibo1 = fibo2 - fibo1;
        }
        /* Guardando la serie en un archivo */
       /* const fs = require('fs');

        fs.writeFile('fibonacci.txt', serie ,(err) => {
            if(err) 
                console.log("Error al crear el archivo");
            else 
                console.log("El archivo fue creado con exito") 
        });
    }*/

module.exports = {
    createSerie
}