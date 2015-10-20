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
    let boundary,
        content,
        disposition,
        type,
        filename,
        pos = 0;

    for (let i = 4; i; i--) {
        var foundPos = body.indexOf('\r\n', pos);
        switch (i) {
            case 4:
                boundary = body.slice(pos + 1, foundPos);
                break;
            case 3:
                disposition = body.slice(pos + 1, foundPos);
                break;
            case 2:
                type = body.slice(pos + 1, foundPos);
                break;
        }
        pos = foundPos + 1;
    }

    filename = parseFilename(disposition);

    content = body.slice(foundPos, body.indexOf(boundary, foundPos));
    //console.log('BD:', boundary, boundary.length);
    //console.log('DP:', disposition, disposition.length);
    //console.log('TP:', type, type.length);
    //console.log('CT:', content, content.length);
    //console.log('Body:', body, body.length);

    fs.writeFile(ROOT + filename, content, 'binary', function(err) {
        if (err) throw err;
        console.error('Wrote OK');
    });

}

function parseFilename(headerValue) {
    var m = headerValue.match(/\bfilename="(.*?)"($|; )/i);
    console.log(m);
    if (!m) {
        m = headerValue.match(/\bfilename\*=utf-8\'\'(.*?)($|; )/i);
        if (m) {
            m[1] = decodeURI(m[1]);
        } else {
            return;
        }
    }
    return m[1];
}
