'use strict';

var http = require('http'),
    staticServer = require('node-static'),
    file = new staticServer.Server('.', {
        cache: 0
    }),
    //url = require('url');
    counter = 0;

http.createServer(function(req, res) {

    console.log(req.url, req.method);
    if (req.url == '/obj') {
        let obj = {
            tag: 'a',
            counter: counter++
        }
        setTimeout(() => {
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.end(JSON.stringify(obj));
        }, 1500);
        return;
    }
    file.serve(req, res);
}).listen(3005);

console.log('Server running on port 3005');
