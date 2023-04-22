const serie = require('./serie')

let argv = process.argv;
let valor  = argv[2].split('=');
console.log(valor[1])
let cantidad = valor[1];

let mensaje = serie.createSerie(cantidad);
serie.createSerie(cantidad)
    .then(mensaje => console.log(mensaje))
    .catch(mensaje => console.log(mensaje)) 