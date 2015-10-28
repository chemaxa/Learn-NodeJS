'use strict';

var http = require('http'),
    staticServer = require('node-static'),
    file = new staticServer.Server('.', {
        cache: 0
    }),
    //url = require('url');
    obj = {
        tag: 'a'
    };
http.createServer(function(req, res) {

    file.serve(req, res);
    console.log(req.url, req.method);
    if (req.url == '/obj') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(obj));
    }
}).listen(3005);

console.log('Server running on port 3005');
