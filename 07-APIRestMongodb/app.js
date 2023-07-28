const express = require('express');
const path = require('path');
const auyh = require('./routes/auth');
const config = require('config');
//const usuarios = require('./routes/usuarios');
//const cursos = require('./routes/cursos');

const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes")(app);

mongoose.connect(config.get('configDB.HOST'), { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));
//mongoose.set('useCreateIndex', true);

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));