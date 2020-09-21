'use strict'

const app = require('../src/app');
const http = require('http');
const mongoose = require('mongoose');
const { connectionString, port } = require('../src/config');

app.set('port', port);
mongoose.connect(connectionString);
const server = http.createServer(app);

server.listen(port, _=> {
    console.log(`Servidor iniciado na porta: ${port}`)
});