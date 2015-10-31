'use strict';

const http = require('http');

// http.Server > net.Server > events.EventEmitter
const server = new http.Server();

// emit on
// задача: вынести обработчик в модуль app.js
server.on('request', (req, res) => {

  res.end("Hello")

});

server.listen(3000);