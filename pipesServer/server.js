'use strict';
let http = require('http'),
    fs = require('fs'),
    //enctype = 'application/x-www-form-urlencoded',
    enctype = 'multipart/form-data',
    //descr = '<input type = "text" name = "description">',
    descr = '',
    form =
    '<form id = "fileForm" enctype="' + enctype + '"  method = "POST">' + '<input type = "file" name = "file">' + descr + '<button> Send file </button> </form>';
const ROOT = __dirname + '\\';
http.createServer((req, res) => {
    if (req.method == 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            parsePost(req, body);
        });
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(form);
    res.end('The end');
}).listen(3000);


function parsePost(req, body) {
    let boundary = req.headers['content-type'].slice(req.headers['content-type'].indexOf('=') + 1), // Get boundary
        content = body.slice(body.indexOf('Content-Type'), -boundary.length),
        header = '',
        pos = 0;

    for (let i = 4; i; i--) {
        let foundPos = body.indexOf('\r\n', pos);
        switch (i) {
            case 4:
                boundary = body.slice(pos + 1, foundPos);
                break;
            case 4:
                boundary = body.slice(pos + 1, foundPos);
                break;
        }
        header += body.slice(pos + 1, foundPos);
        console.log(pos, foundPos, body.slice(pos + 1, foundPos));
        pos = foundPos + 1;
    }
    console.log('HD:', header, header.length);
    console.log('Body:', body, body.length);
    /*console.log('CT:', content, content.length);
    console.log('BD:', boundary, boundary.length);
    console.log('HD:', header, header.length);*/
    fs.writeFile(ROOT + 'text', body, 'binary', function(err) {
        if (err) throw err;
        console.error('Wrote OK');
    });

    //console.log('CT', contentType);
    //console.log(req.headers['content-type']);
    //saveFile(contentType);
}

function saveFile(body) {
    fs.writeFile(ROOT + 'text.txt', 'Hey there!', function(err) {
        if (err) {
            return console.log(err);
        }

        console.log('The file was saved!');
    });
}

function parseFilename(headerValue) {
    var m = headerValue.match(/\bfilename="(.*?)"($|; )/i);
    if (!m) {
        m = headerValue.match(/\bfilename\*=utf-8\'\'(.*?)($|; )/i);
        if (m) {
            m[1] = decodeURI(m[1]);
        } else {
            return;
        }
    }
}
