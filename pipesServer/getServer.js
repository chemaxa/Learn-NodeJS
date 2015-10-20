// http://localhost:3000/kot.jpg?secret=123 -- Normal URL

'use strict';
var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path');
const ROOT = __dirname + '\\public';

http.createServer(function(req, res) {
    if (!checkAccess(req)) {
        res.statusCode = 403;
        res.end('Input password!');
        return;
    }
    sendFileSafe(url.parse(req.url).pathname, res);
}).listen(3000);

function checkAccess(req) {
    return url.parse(req.url, true).query.secret == '123';
}

function sendFileSafe(filePath, res) {

    try {
        filePath = decodeURIComponent(filePath);
    } catch (e) {
        err400(res);
        return;
    }

    if (~filePath.indexOf('\0')) {
        err400(res);
        return;
    }

    filePath = path.normalize(path.join(ROOT, filePath));

    if (filePath.indexOf(ROOT) != 0) {
        err404(res);
        return;
    }

    fs.stat(filePath, function(err, stats) {
        if (err || !stats.isFile()) {
            console.log(err);
            err404(res);
            return;
        }
        sendFile(filePath, res);
    });
}

function sendFile(filePath, res) {
    var file = new fs.ReadStream(filePath);
    file.pipe(res);
    file.on('error', function(err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
    });

    res.on('close', function() {
        file.destroy();
    });

    /*fs.readFile(filePath, function(err, content) {
        if (err) throw err;
        var mime = require('mime').lookup(filePath);

        res.setHeader('Content-Type', mime + '; charset=utf-8');
        res.end(content);
    });*/
}

function err400(res) {
    res.statusCode = 400;
    res.end('Bad request');
}

function err404(res) {
    res.statusCode = 404;
    res.end('File not found');
}
