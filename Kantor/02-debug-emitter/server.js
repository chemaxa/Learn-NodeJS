'use strict';

// JS -> I/O -> sleep! -> JS -> I/O -> sleep -> JS ...
//   ^  

const http = require('http');
const EventEmitter = require('events').EventEmitter;

let emit = EventEmitter.prototype.emit;

EventEmitter.prototype.emit = function(event) {
  if (this.debugEmitter) {
    console.log(this.debugEmitter, event);
  }
  return emit.apply(this, arguments);
};


// http.Server > net.Server > events.EventEmitter
const server = new http.Server();

const handler = require('./handler');

// emit on
// задача: вынести обработчик в модуль app.js
server.debugEmitter = "server";
server.on('request', (req, res) => {

  setTimeout(() => res.end("Hello"), 2000);

});

server.listen(3000, () => console.log("ONLINE!"));
server.close();