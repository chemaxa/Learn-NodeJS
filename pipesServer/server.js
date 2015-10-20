// Working with localhost:3000
'use strict';
let http = require('http'),
    fs = require('fs'),
    enctype = 'multipart/form-data', // enctype
    //descr = '<input type = "text" name = "description">', // Description for uploaded file, not work :(
    descr = '',
    form =
    '<form id = "fileForm" enctype="' + enctype + '"  method = "POST">' + '<input type = "file" name = "file">' + descr + '<button> Send file </button> </form>'; // HTML form
const ROOT = __dirname + '\\'; // Upload in current dir

http.createServer((req, res) => {
    if (req.method == 'POST') { // If POST
        let body = ''; // Body of POST request
        req.on('data', (chunk) => {
            body += chunk; // get bytes 
        });

        req.on('end', () => {
            parsePost(req, body); // Parse POST
        });
    }
    // Set Headers
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write(form); // Send form to client
    res.end('The end'); // close connection
}).listen(3000);

function parsePost(req, body) {
    let boundary, // boundary for multipart
        content, // binary content from POST
        disposition, // Content-Disposition from headers
        type, // Content-Type from headers
        filename, // filename as filename.png
        pos = 0; // start pos for parsing

    for (let i = 4; i; i--) { // parse POST as string
        var foundPos = body.indexOf('\r\n', pos);
        switch (i) {
            case 4: // Get boundary
                boundary = body.slice(pos + 1, foundPos);
                break;
            case 3: // Disposition
                disposition = body.slice(pos + 1, foundPos);
                break;
            case 2: // Type
                type = body.slice(pos + 1, foundPos);
                break;
        }
        pos = foundPos + 1;
    }
    // Get filename
    filename = parseFilename(disposition);

    content = body.slice(foundPos, body.indexOf(boundary, foundPos));
    // Debug :)
    //console.log('BD:', boundary, boundary.length);
    //console.log('DP:', disposition, disposition.length);
    //console.log('TP:', type, type.length);
    //console.log('CT:', content, content.length);
    //console.log('Body:', body, body.length);
    // Write files< not work :(
    fs.writeFile(ROOT + filename, content, 'binary', function(err) {
        if (err) throw err;
        console.log('Wrote OK');
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
